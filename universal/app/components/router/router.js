import URLSearchParams from "url-search-params";
import defineState from "../store/defineState";
import initRouter from "../../effects/initRouter";
import routes from "../../routes";
import renderChild from "../util/renderChild";

function hydrateRoute(route) {
    return typeof route === "string" ? routes[route] : null;
}

function dehydrateRoute(route) {
    return route === null ? null : route.name;
}

function hydrateParams(params) {
    return typeof params === "string" ? new URLSearchParams(params) : null;
}

function dehydrateParams(params) {
    return params === null ? null : params.toString();
}

export const state = defineState({
    scope: "router",
    hydrate({ entryUrl, route, params, previousRoute, previousParams }) {
        return {
            entryUrl: entryUrl === "string" ? entryUrl : "",
            route: hydrateRoute(route),
            params: hydrateParams(params),
            previousRoute: hydrateRoute(previousRoute),
            previousParams: hydrateParams(previousParams),
            toJSON() {
                return {
                    entryUrl: this.entryUrl,
                    route: dehydrateRoute(this.route),
                    params: dehydrateParams(this.params),
                    previousRoute: dehydrateRoute(this.previousRoute),
                    previousParams: dehydrateParams(this.previousParams),
                };
            },
        };
    },
    actions: {
        init: entryUrl => (getState, patchState, dispatchAction) => {
            patchState({
                entryUrl,
            });
            initRouter(entryUrl, (route, params) => {
                dispatchAction(state.actions.handleRouteMatch(route, params));
            });
        },
        handleRouteMatch: (route, params) => async (getState, updateState, dispatchAction) => {
            const oldState = getState();
            const newState = {
                route,
                params,
                previousRoute: oldState.route,
                previousParams: oldState.params,
            };

            updateState(newState);

            const component = await route.component();

            if ("state" in component === true && typeof component.state.actions.enter === "function") {
                await dispatchAction(component.state.actions.enter(route, params));
            }
        },
    },
});

export default renderChild;
