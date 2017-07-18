import url from "url";
import defineState from "../store/defineState";
import contexts from "../../contexts";
import createRouter from "./createRouter";
import renderChild from "../util/renderChild";
import has from "../../util/has";
import routes from "../../routes";
import history from "../../effects/history";

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

                    if (state.request.method !== "get" && state.route.error === true) {
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

function sanitizeRequest(req) {
    const request = typeof req === "string" ? { ...defaultRequest, url: req } : req;
    const parsedUrl = parseUrl(request.url);

    return {
        sanitized: true,
        method: request.method.toLowerCase(),
        url: parsedUrl.path + (typeof parsedUrl.hash === "string" ? parsedUrl.hash : ""),
        parsedUrl,
        body: request.body,
    };
}

function changeRoute({ abortIf, historyEffect }) {
    return (request, statusCode) => (getState, patchState, dispatchAction, execEffect) =>
        new Promise(resolve => {
            const oldState = getState();
            const sanitizedReq = sanitizeRequest(request);

            if (abortIf(oldState, sanitizedReq)) {
                resolve(oldState);

                return;
            }

            const { route, params } = resolveRouteAndParams(sanitizedReq.parsedUrl);

            execEffect(historyEffect, sanitizedReq.url, statusCode);
            resolve(enterRoute(sanitizedReq, route, params)(getState, patchState, dispatchAction));
        });
}

function parseUrl(u) {
    return url.parse(u, true);
}

function isCurrentGetRequest(state, request) {
    return state.request !== null && state.request.method === "get" && state.request.url === request.url;
}

function resolveRouteAndParams(parsedUrl) {
    const { route, urlParams } = router(parsedUrl.pathname);

    return {
        route,
        params: Object.assign(parsedUrl.query, urlParams),
    };
}

function enterRoute(request, optionalRoute, optionalParams) {
    return (getState, patchState, dispatchAction) =>
        new Promise(resolve => {
            const sanitizedReq = request.sanitized ? request : sanitizeRequest(request);
            const resolvedRouteAndParams =
                optionalRoute && optionalParams ? null : resolveRouteAndParams(sanitizedReq.parsedUrl);
            const route = optionalRoute ? optionalRoute : resolvedRouteAndParams.route;
            const params = optionalParams ? optionalParams : resolvedRouteAndParams.params;
            const state = {
                request: sanitizedReq,
                route,
                params,
            };

            patchState(state);
            resolve(handleTransition(getState, patchState, dispatchAction));
        });
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
    },
});

export default renderChild;
