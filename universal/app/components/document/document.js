import registries from "../../registries";
import defineState from "../store/defineState";
import renderChild from "../util/renderChild";

export const state = defineState({
    scope: "document",
    context: registries.stateContext,
    initialState: {
        statusCode: null,
        title: null,
        headerTags: null,
    },
    actions: {
        update: newState => (getState, patchState, dispatchAction, execEffect) => {
            patchState(newState);
        },
    },
});

export default renderChild;
