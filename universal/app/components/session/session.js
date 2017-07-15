import renderChild from "../util/renderChild";
import defineState from "../store/defineState";
import contexts from "../../contexts";

const name = "session";

export const state = defineState({
    scope: name,
    context: contexts.state,
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
