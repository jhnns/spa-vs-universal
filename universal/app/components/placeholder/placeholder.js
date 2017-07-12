import Loading from "../loading/loading";
import defineComponent from "../util/defineComponent";
import definePromiseCache, { selectResolved, selectError } from "../util/definePromiseCache";

const name = "placeholder";

export const placeholderCache = definePromiseCache({
    scope: name + "Cache",
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [placeholderCache.select],
        mapToState(promiseCacheState, props) {
            const promiseFactory = props.component;

            return {
                component: selectResolved(promiseCacheState, promiseFactory),
                error: selectError(promiseCacheState, promiseFactory),
            };
        },
    },
    onPropsChange(dispatchAction, props) {
        dispatchAction(placeholderCache.actions.executeIfNotCached(props.component));
    },
    render(props, state) {
        if (state.component !== null) {
            const Component = state.component.default;

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
