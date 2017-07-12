import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import renderChild from "../util/renderChild";
import { state as documentState } from "../document/document";

const name = "top5";

export const state = defineState({
    scope: name,
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

export default defineComponent({
    name,
    render() {
        return <span>Top 5</span>;
    },
});
