import defineState from "../../store/defineState";
import contexts from "../../contexts";
import renderChild from "../util/renderChild";
import has from "../../util/has";
import routes from "../../routes";
import history from "../../effects/history";
import changeRoute from "./util/changeRoute";
import enterRoute from "./util/enterRoute";
import sanitizeRequest from "./util/sanitizeRequest";

const name = "router";

function isCurrentGetRequest(state, request) {
    return state.request !== null && state.request.method === "GET" && state.request.url === request.url;
}

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        request: null,
        route: null,
        params: null,
    },
    hydrate(dehydrated) {
        const route = dehydrated.route;

        return {
            ...dehydrated,
            route: route !== null && has(routes, route.name) ? routes[route.name] : null,
        };
    },
    actions: {
        push: changeRoute({ abortIf: isCurrentGetRequest, historyEffect: history.push }),
        replace: changeRoute({ abortIf: isCurrentGetRequest, historyEffect: history.replace }),
        enter: enterRoute,
        reset: url => (getState, patchState, dispatchAction, execEffect) => {
            const request = sanitizeRequest(url);

            return Promise.resolve(execEffect(history.reset, request.url));
        },
    },
});

export default renderChild;
