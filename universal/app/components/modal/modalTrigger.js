import defineComponent from "../util/defineComponent";
import { state as routerState } from "../router/router";
import { state as modalState } from "./modal";
import has from "../../util/has";

const name = "modalTrigger";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select, modalState.select],
        mapToState: ({ params }, { component }, { triggerParam, children }, oldState) => {
            const active = parseInt(params[triggerParam]) === 1;
            const modalComponent = children[0];
            let modalAction = null;

            if (active === true && (component === null || component.nodeName !== modalComponent.nodeName)) {
                modalAction = modalState.actions.show(modalComponent);
            } else if (active === false && component !== null && component.nodeName === modalComponent.nodeName) {
                modalAction = modalState.actions.hide();
            }

            return {
                modalAction,
            };
        },
    },
    willUpdate(props, state, dispatchAction) {
        if (state.modalAction !== null) {
            if (has(props, "importAction")) {
                dispatchAction(props.importAction);
            }
            dispatchAction(state.modalAction);
        }
    },
    render() {
        return null;
    },
});
