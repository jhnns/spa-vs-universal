import contexts from "../../contexts";
import defineState from "../../store/defineState";
import renderChild from "../util/renderChild";
import document from "../../effects/document";

export const state = defineState({
    scope: "document",
    context: contexts.state,
    initialState: {
        statusCode: null,
        title: null,
        headerTags: null,
    },
    actions: {
        update: state => (getState, patchState, dispatchAction, execEffect) => {
            patchState(state);

            const newState = getState();

            execEffect(document.setTitle, newState.title);
        },
    },
});

export default renderChild;
