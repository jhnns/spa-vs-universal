import defineComponent from "../util/defineComponent";
import { selectPreviousUrl } from "./router";
import Link from "./link";

const name = "goBack";

export default defineComponent({
    name,
    connectToStore: {
        watch: [selectPreviousUrl],
        mapToState: previousUrl => ({
            previousUrl,
        }),
    },
    render(props, state) {
        return <Link {...props} href={state.previousUrl} />;
    },
});
