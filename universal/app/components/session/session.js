import renderChild from "../util/renderChild";
import defineState from "../store/defineState";
import registries from "../../registries";

const name = "session";

export const state = defineState({
    scope: name,
    context: registries.stateContext,
    initialState: {
        user: null,
        token: null,
    },
    actions: {},
});

export function isLoggedIn(globalState) {
    return state.select(globalState).user !== null;
}

export default renderChild;
