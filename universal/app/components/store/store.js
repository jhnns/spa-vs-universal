import defineState from "./defineState";
import defineComponent from "../util/defineComponent";

export const state = defineState({
    scope: "store",
    hydrate() {
        return {
            pendingActions: [],
            toJSON: () => undefined,
        };
    },
    actions: {
        addPendingAction: action => (getState, patchState) => {
            const oldState = getState();

            patchState({
                pendingActions: oldState.pendingActions.concat(action),
            });
        },
        removePendingAction: action => (getState, patchState) => {
            const oldState = getState();

            patchState({
                pendingActions: oldState.pendingActions.filter(a => a !== action),
            });
        },
    },
});

export default defineComponent({
    name: "Store",
    getChildContext(props) {
        return {
            ...this,
            store: props.store,
        };
    },
});
