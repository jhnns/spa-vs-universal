import AsyncCacheComponent from "./asyncCacheComponent";
import Loading from "./loading/loading";

export default class Placeholder extends AsyncCacheComponent {
    render(props, state) {
        const Component = state.componentResult;

        if (Component !== null) {
            return <Component {...props.props} />;
        }

        const children = props.children;

        if (children.length === 0) {
            return <Loading />;
        }

        const childGenerator = children[0];

        return childGenerator(state.componentError);
    }
}
