import defineComponent from "../util/defineComponent";
import { state as routerState } from "../router/router";
import { state as modalState } from "./modal";

const name = "modalRef";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select, modalState.select],
        mapToState: ({ params }, { component }, { activationParam, children }, oldState) => {
            const active = parseInt(params[activationParam]) === 1;
            const modalComponent = children[0];
            let modalAction = null;

            if (active === true && component !== modalComponent) {
                modalAction = modalState.actions.show(modalComponent);
            } else if (active === false && component === modalComponent) {
                modalAction = modalState.actions.hide();
            }

            return {
                modalAction,
            };
        },
    },
    willUpdate(props, state, dispatchAction) {
        if (state.modalAction !== null) {
            dispatchAction(state.modalAction);
        }
    },
    render() {
        return null;
    },
});
