import Loading from "../loading/loading";
import defineComponent from "../util/defineComponent";
import definePromiseCache, { selectResolved, selectError } from "../util/definePromiseCache";

const name = "placeholder";
const promiseCache = definePromiseCache({
    scope: name + "Cache",
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [promiseCache.select],
        mapToState(promiseCacheState, props) {
            const promiseFactory = props.component;

            return {
                component: selectResolved(promiseCacheState, promiseFactory),
                error: selectError(promiseCacheState, promiseFactory),
            };
        },
    },
    onPropsChange(dispatchAction, props) {
        dispatchAction(promiseCache.actions.executeIfNotCached(props.component));
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
