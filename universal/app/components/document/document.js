import contexts from "../../contexts";
import defineState from "../store/defineState";
import renderChild from "../util/renderChild";

export const state = defineState({
    scope: "document",
    context: contexts.state,
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
