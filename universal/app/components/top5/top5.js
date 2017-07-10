import defineState from "../store/defineState";
import renderChild from "../util/renderChild";
import { state as documentState } from "../document/document";

export const state = defineState({
    scope: "top5",
    hydrate(dehydratedState) {
        return {
            ...dehydratedState,
        };
    },
    actions: {
        enter: () => (getState, patchState, dispatchAction, execEffect) => {
            dispatchAction(
                documentState.actions.update({
                    statusCode: 200,
                    title: "Top 5 Peerigon News",
                    headerTags: [],
                })
            );
        },
    },
});

export default renderChild;
