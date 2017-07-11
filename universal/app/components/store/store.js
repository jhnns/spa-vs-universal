import defineState from "./defineState";
import defineComponent from "../util/defineComponent";

function pendingActions(state) {
    return state.pendingActions;
}

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
            patchState({
                pendingActions: pendingActions(getState()).concat(action),
            });
        },
        removePendingAction: action => (getState, patchState) => {
            patchState({
                pendingActions: pendingActions(getState()).filter(a => a !== action),
            });
        },
    },
    select: {
        pendingActions,
    },
});

export default defineComponent({
    name: "store",
    getChildContext() {
        return {
            ...this.context,
            store: this.props.store,
        };
    },
});
