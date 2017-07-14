import url from "url";
import defineState from "../store/defineState";
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

                return Promise.resolve(dispatchAction(componentModule.state.actions.enter(route, params))).then(() =>
                    getState()
                );
            })
        );
    });
}

function changeRoute(abortChange, reduceHistory) {
    return url => (getState, patchState, dispatchAction) =>
        new Promise(resolve => {
            const oldState = getState();
            const parsedUrl = parseUrl(url);
            const sanitizedUrl = parsedUrl.path + (typeof parsedUrl.hash === "string" ? parsedUrl.hash : "");

            if (abortChange(oldState, sanitizedUrl)) {
                resolve(oldState);

                return;
            }

            const { route, params } = resolveRouteAndParams(parsedUrl);

            patchState({
                url: sanitizedUrl,
                route,
                params,
                history: reduceHistory(oldState.history, sanitizedUrl),
            });

            resolve(handleTransition(getState, patchState, dispatchAction));
        });
}

function parseUrl(u) {
    return url.parse(u, true);
}

function isCurrentUrl(state, url) {
    return state.url === url;
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

export const state = defineState({
    scope: name,
    initialState: {
        entryUrl: null,
        url: null,
        route: null,
        params: null,
        history: [],
    },
    hydrate(dehydrated) {
        const route = dehydrated.route;

        return {
            ...dehydrated,
            route: route !== null && has(routes, route.name) ? routes[route.name] : null,
        };
    },
    actions: {
        push: changeRoute(isCurrentUrl, (history, url) => history.concat(url)),
        replace: changeRoute(isCurrentUrl, (history, url) => history.slice().splice(-1, 1, url)),
        pop: () => (getState, patchState, dispatchAction) =>
            new Promise(resolve => {
                const oldState = getState();
                const history = oldState.history;

                resolve(
                    history.length < 2 ?
                        oldState :
                        changeRoute(returnFalse, history => history.slice(0, -1))(history[history.length - 2])(
                            getState,
                            patchState,
                            dispatchAction
                        )
                );
            }),
    },
});

export default renderChild;
