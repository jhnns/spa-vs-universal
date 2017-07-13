import defineState from "../store/defineState";
import renderChild from "../util/renderChild";
import { state as documentState } from "../document/document";

export const state = defineState({
    scope: "notFound",
    actions: {
        enter: () => (getState, patchState, dispatchAction, execEffect) => {
            dispatchAction(
                documentState.actions.update({
                    statusCode: 404,
                    title: "Not Found",
                    headerTags: [],
                })
            );
        },
    },
});

export default renderChild;
