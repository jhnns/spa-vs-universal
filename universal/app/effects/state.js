import defineState from "../store/defineState";

export default defineState({
    scope: "effects",
    hydrateState() {
        return {
            pendingEffects: [],
        };
    },
    dehydrate() {
        return undefined;
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
