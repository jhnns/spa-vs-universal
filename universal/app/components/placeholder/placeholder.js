import Loading from "../loading/loading";
import defineComponent from "../util/defineComponent";
import defineAsyncCache, { selectResolved, selectError } from "../util/defineAsyncCache";

const name = "placeholder";
const asyncCache = defineAsyncCache({
    scope: name + "Cache",
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [asyncCache.select],
        mapToState(asyncCacheState, props) {
            const promiseFactory = props.component;

            return {
                component: selectResolved(asyncCacheState, promiseFactory),
                error: selectError(asyncCacheState, promiseFactory),
            };
        },
    },
    onPropsChange(dispatchAction, props) {
        dispatchAction(asyncCache.actions.runIfNotCached(props.component));
    },
    render(props, state) {
        const Component = state.component;

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
