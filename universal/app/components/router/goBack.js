import defineComponent from "../util/defineComponent";
import hookIntoEvent from "../util/hookIntoEvent";
import { state as routerState, selectPreviousUrl } from "./router";
import Link from "./link";

export const name = "goBack";

export default defineComponent({
    name,
    connectToStore: {
        watch: [selectPreviousUrl],
        mapToState: previousUrl => ({
            previousUrl,
        }),
    },
    handlers: {
        handleClick: hookIntoEvent("click", (dispatchAction, event, props, state) => {
            if (state.previousUrl === null) {
                return;
            }
            dispatchAction(routerState.actions.pop());
            event.preventDefault();
            event.stopPropagation();
        }),
    },
    render(props, state) {
        return (
            <Link title={"Go back"} {...props} onClick={this.handleClick} replaceRoute={state.previousUrl === null} />
        );
    },
});
