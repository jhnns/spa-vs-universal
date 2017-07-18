import url from "url";
import defineState from "../store/defineState";
import contexts from "../../contexts";
import createRouter from "./createRouter";
import renderChild from "../util/renderChild";
import has from "../../util/has";
import routes from "../../routes";
import { read as readHistory, write as writeHistory } from "../../effects/storage/session/history";

const name = "router";
const router = createRouter();
const defaultRequest = {
    method: "get",
    url: "/",
    body: {},
};

function handleTransition(getState, patchState, dispatchAction) {
    return new Promise(resolve => {
        const { route } = getState();

        resolve(
            dispatchAction(route.action).then(componentModule => {
                const state = getState();

                if (state.route !== route) {
                    // User has already switched the route
                    return state;
                }

                const actions = componentModule.state.actions;
                let action = null;

                if (state.route === state.previousRoute) {
                    if (has(actions, "update")) {
                        action = actions.update;
                    }
                } else {
                    if (has(actions, "enter") === false) {
                        throw new Error(`Route ${ route.name } has no enter action`);
                    }
                    action = actions.enter;
                }

                return Promise.resolve(
                    action === null ? null : dispatchAction(action(state.request, state.route, state.params))
                ).then(() => {
                    const state = getState();
                    const isErrorRoute = state.route.error === true;

                    if (state.request.method !== "get" && isErrorRoute === false) {
                        throw new Error(
                            "Router finished with non-get request. Use the replace action to forward to a get request."
                        );
                    }

                    return state;
                });
            })
        );
    });
}

function sanitizeRequest(request) {
    const parsedUrl = parseUrl(request.url);

    return {
        method: request.method.toLowerCase(),
        url: parsedUrl.path + (typeof parsedUrl.hash === "string" ? parsedUrl.hash : ""),
        parsedUrl,
        body: request.body,
    };
}

function changeRoute(abortChange, reduceHistory) {
    return req => {
        const request = typeof req === "string" ? { ...defaultRequest, url: req } : req;

        return (getState, patchState, dispatchAction, execEffect) =>
            new Promise(resolve => {
                const oldState = getState();
                const sanitizedReq = sanitizeRequest(request);

                if (abortChange(oldState, sanitizedReq)) {
                    resolve(oldState);

                    return;
                }

                const { route, params } = resolveRouteAndParams(sanitizedReq.parsedUrl);
                const history = reduceHistory(oldState.history, sanitizedReq.url);

                patchState({
                    request: sanitizedReq,
                    route,
                    params,
                    previousRoute: oldState.route,
                    previousParams: oldState.params,
                    history,
                });
                execEffect(writeHistory, history);

                resolve(handleTransition(getState, patchState, dispatchAction));
            });
    };
}

function changeBack(request) {
    return changeRoute(returnFalse, (history, url) => {
        const newHistory = history.slice(0, -2);

        newHistory.push(url);

        return newHistory;
    })(request);
}

function parseUrl(u) {
    return url.parse(u, true);
}

function isCurrentRequest(state, request) {
    return state.request !== null && state.request.url === request.url && state.request.method === request.method;
}

function returnFalse() {
    return false;
}

function resolveRouteAndParams(parsedUrl) {
    const { route, urlParams } = router(parsedUrl.pathname);

    return {
        route,
        params: Object.assign(parsedUrl.query, urlParams),
    };
}

export function selectPreviousUrl(contextState) {
    const history = state.select(contextState).history;

    return history.length > 1 ? history[history.length - 2] : null;
}

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        request: null,
        route: null,
        params: null,
        previousRoute: null,
        previousParams: null,
        history: [],
    },
    hydrate(dehydrated, execEffect) {
        const history = execEffect(readHistory);
        const route = dehydrated.route;

        return {
            ...dehydrated,
            history: history === null ? dehydrated.history : history,
            route: route !== null && has(routes, route.name) ? routes[route.name] : null,
        };
    },
    actions: {
        push: changeRoute(isCurrentRequest, (history, url) => history.concat(url)),
        replace: changeRoute(isCurrentRequest, (history, url) => {
            const newHistory = history.slice(0, -1);

            newHistory.push(url);

            return newHistory;
        }),
        show: (route, params, initialRequest) => (getState, patchState, dispatchAction) =>
            new Promise(resolve => {
                const state = {
                    route,
                    params,
                };

                if (initialRequest === undefined) {
                    if (getState().request === null) {
                        throw new Error("Cannot call show without initial request");
                    }
                } else {
                    state.request = sanitizeRequest(initialRequest);
                }

                patchState(state);
                resolve(handleTransition(getState, patchState, dispatchAction));
            }),
        pop: url => (getState, patchState, dispatchAction, execEffect) =>
            new Promise(resolve => {
                const oldState = getState();
                const history = oldState.history;

                if (url === undefined) {
                    if (history.length < 2) {
                        throw new Error("End of routing history. Cannot go back to unknown url.");
                    }
                    url = history[history.length - 2];
                }

                resolve(
                    // pop actions always result in get methods because all the other methods are not in the history
                    changeBack(url)(getState, patchState, dispatchAction, execEffect)
                );
            }),
    },
});

export default renderChild;
