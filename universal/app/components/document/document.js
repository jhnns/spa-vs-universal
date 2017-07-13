import defineState from "../store/defineState";
import renderChild from "../util/renderChild";
import updateDocument from "../../effects/updateDocument";

export const state = defineState({
    scope: "document",
    initialState: {
        statusCode: null,
        title: null,
        headerTags: null,
    },
    actions: {
        update: newState => (getState, patchState, dispatchAction, execEffect) => {
            patchState(newState);
            execEffect(updateDocument, newState);
        },
    },
});

export default renderChild;
