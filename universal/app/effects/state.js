import createActions from "../store/createActions";

export const scope = "effects";

const initialState = {
    pendingEffects: [],
};

export const actions = createActions(scope, {
    init: (effect, args, promise) => (getState, updateState, exec) => {
        updateState(initialState);
    },
    addPendingEffect: (effect, args, promise) => (getState, updateState, exec) => {
        const state = getState();
        const effectHandle = {
            effect,
            args,
            promise,
        };

        updateState({
            ...state,
            pendingEffects: state.pendingEffects.concat(effectHandle),
        });
    },
    removePendingEffect: (effect, args, promise) => (getState, updateState, exec) => {
        const state = getState();

        updateState({
            ...state,
            pendingEffects: state.pendingEffects.filter(
                e => e.effect !== effect && e.args !== args && e.promise !== promise
            ),
        });
    },
});
