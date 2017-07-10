import defineState from "../store/defineState";

export const scope = "effects";

export default defineState({
    scope: "effects",
    initialState: {
        pendingEffects: [],
    },
    actions: {
        addPendingEffect: (effect, args, promise) => (getState, patchState, exec) => {
            const effectHandle = {
                effect,
                args,
                promise,
            };

            patchState({
                pendingEffects: getState().pendingEffects.concat(effectHandle),
            });
        },
        removePendingEffect: (effect, args, promise) => (getState, patchState, exec) => {
            patchState({
                pendingEffects: getState().pendingEffects.filter(
                    e => e.effect !== effect && e.args !== args && e.promise !== promise
                ),
            });
        },
    },
});
