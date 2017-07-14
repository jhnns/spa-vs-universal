import renderChild from "../util/renderChild";
import defineState from "../store/defineState";

const name = "session";

export const state = defineState({
    scope: name,
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
