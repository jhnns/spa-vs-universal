import defineState from "../store/defineState";
import contexts from "../../contexts";

const name = "login";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        enter: (route, params) => (getState, patchState, dispatchAction) => {
            console.log("entered login");
        },
    },
});
