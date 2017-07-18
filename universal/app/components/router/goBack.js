import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";
import Link from "./link";
import has from "../../util/has";
import filterProps from "../../util/filterProps";

const name = "goBack";
const ownProps = ["fallback"];

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ params }, props) => ({
            previousUrl: has(params, "previous") ? params.previous : has(props, "fallback") ? props.fallback : "/",
        }),
    },
    render(props, state) {
        const linkProps = filterProps(props, ownProps);

        return <Link {...linkProps} href={state.previousUrl} />;
    },
});
