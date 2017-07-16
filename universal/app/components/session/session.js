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

export function isLoggedIn(contextState) {
    return state.select(contextState).user !== null;
}

export default renderChild;
