import url from "url";
import defineState from "../store/defineState";
import contexts from "../../contexts";
import createRouter from "./createRouter";
import renderChild from "../util/renderChild";
import routes from "../../routes";
import has from "../../util/has";

const name = "router";
const router = createRouter();

function handleTransition(getState, patchState, dispatchAction) {
    return new Promise(resolve => {
        const { route, params } = getState();

        resolve(
            dispatchAction(route.action).then(componentModule => {
                const state = getState();

                if (state.route !== route) {
                    // User has already switched the route
                    return state;
                }

                return Promise.resolve(dispatchAction(componentModule.state.actions.enter(route, params))).then(() => {
                    const state = getState();

                    if (state.request.method !== "get") {
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

function changeRoute(abortChange, reduceHistory) {
    return req => (getState, patchState, dispatchAction, execEffect) =>
        new Promise(resolve => {
            const oldState = getState();
            const parsedUrl = parseUrl(req.url);
            const sanitizedReq = {
                method: req.method.toLowerCase(),
                url: parsedUrl.path + (typeof parsedUrl.hash === "string" ? parsedUrl.hash : ""),
            };

            if (abortChange(oldState, sanitizedReq)) {
                resolve(oldState);

                return;
            }

            const { route, params } = resolveRouteAndParams(parsedUrl);

            patchState({
                request: sanitizedReq,
                route,
                params,
                history: reduceHistory(oldState.history, sanitizedReq.url),
            });
            execEffect(state.persist.session, getState());

            resolve(handleTransition(getState, patchState, dispatchAction));
        });
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

export function selectPreviousUrl(globalState) {
    const history = state.select(globalState).history;

    return history.length > 1 ? history[history.length - 2] : null;
}

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        request: null,
        route: null,
        params: null,
        history: [],
    },
    persist: {
        session: ["history"],
    },
    hydrate(dehydrated, localState, sessionState) {
        const route = dehydrated.route;

        return {
            ...dehydrated,
            history: sessionState === null ? dehydrated.history : sessionState.history,
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
                    changeBack({
                        // pop actions always result in get methods because all the other methods are not in the history
                        method: "get",
                        url,
                    })(getState, patchState, dispatchAction, execEffect)
                );
            }),
    },
});

export default renderChild;
