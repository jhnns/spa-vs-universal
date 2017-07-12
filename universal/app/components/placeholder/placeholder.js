import Loading from "../loading/loading";
import defineComponent from "../util/defineComponent";
import defineAsyncCache, { applyToState } from "../util/defineAsyncCache";

const name = "placeholder";
const asyncCache = defineAsyncCache({
    scope: name + "Cache",
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [asyncCache.select],
        map(cache) {
            const newState = {};
            const promiseFactory = this.props.componet;

            applyToState("component", cache, promiseFactory, newState);

            return newState;
        },
    },
    render(props, state) {
        const Component = state.Component;

        if (Component !== null) {
            return <Component {...props.props} />;
        }

        const children = props.children;

        if (children.length === 0) {
            return <Loading />;
        }

        const childGenerator = children[0];

        return childGenerator(state.componentError);
    },
});
