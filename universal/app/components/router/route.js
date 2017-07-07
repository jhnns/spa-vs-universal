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

export function trackPendingMiddleware(store) {
    return next => action => {
        const payload = action.payload;
        const isPromise = typeof action.payload.then === "function";

        if (isPromise === true) {
            store.dispatch(state.actions.increasePending());
            payload.then(() => store.dispatch(state.actions.decreasePending));
        }
    };
}

export default defineComponent(moduleNs.get("Route"), {});
