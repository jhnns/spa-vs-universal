import Namespace from "../util/namespace";
import defineComponent from "../util/defineComponent";
import defineState from "../util/defineState";

const moduleNs = new Namespace(module.id);

export const state = defineState(moduleNs.get("route"), {
    initial: {
        pending: 0,
    },
    actions: {
        increasePending(state) {
            return {
                ...state,
                pending: state.pending + 1,
            };
        },
        decreasePending(state) {
            return {
                ...state,
                pending: state.pending - 1,
            };
        },
    },
});

export default defineComponent(moduleNs.get("Route"), {});
