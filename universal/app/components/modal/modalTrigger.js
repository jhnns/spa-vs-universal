import defineComponent from "../util/defineComponent";
import { state as routerState } from "../router/router";
import { state as modalState } from "./modal";
import has from "../../util/has";

const name = "modalTrigger";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ request, route, params }, { triggerParam }, oldState) => {
            const isErrorRoute = route.error === true;
            const skipStateChange = request.method !== "GET" && isErrorRoute === false;

            if (skipStateChange) {
                return oldState;
            }

            return {
                shouldBeActive: parseInt(params[triggerParam]) === 1,
            };
        },
    },
    willUpdate(props, state, dispatchAction) {
        const childComponent = props.children[0];

        if (state.shouldBeActive) {
            if (has(props, "importAction")) {
                dispatchAction(props.importAction);
            }
            dispatchAction(modalState.actions.show(childComponent));
        } else {
            dispatchAction(modalState.actions.hide(childComponent));
        }
    },
    render() {
        return null;
    },
});
