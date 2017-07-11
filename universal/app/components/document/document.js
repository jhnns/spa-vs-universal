import defineState from "../store/defineState";
import renderChild from "../util/renderChild";

export const state = defineState({
    scope: "document",
    hydrate(dehydratedState) {
        return {
            statusCode: null,
            title: null,
            headerTags: null,
            ...dehydratedState,
        };
    },
    actions: {
        update: newState => (getState, patchState, dispatchAction, execEffect) => {
            patchState(newState);
        },
    },
});

export default renderChild;
