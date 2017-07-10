import defineState from "../../store/defineState";
import renderChild from "../util/renderChild";

function statusCode(state) {
    return state.statusCode;
}

function title(state) {
    return state.title;
}

function headerTags(state) {
    return state.headerTags;
}

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
    select: {
        statusCode,
        title,
        headerTags,
    },
});

export default renderChild;
