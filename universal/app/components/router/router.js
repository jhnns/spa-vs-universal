import URLSearchParams from "url-search-params";
import defineState from "../store/defineState";
import initRouter from "../../effects/initRouter";
import routes from "../../routes";
import renderChild from "../util/renderChild";
import routeToUrl from "../../util/routeToUrl";
import has from "../../util/has";

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
    hydrate(dehydratedState) {
        const entryUrl = has(dehydratedState, "entryUrl") ? dehydratedState.entryUrl : "";
        const route = hydrateRoute(dehydratedState.route);
        const params = hydrateParams(dehydratedState.params);
        const previousRoute = hydrateRoute(dehydratedState.previousRoute);
        const previousParams = hydrateParams(dehydratedState.previousParams);

        return {
            entryUrl,
            url: route === null ? null : routeToUrl(route, params),
            route,
            params,
            previousUrl: previousRoute === null ? null : routeToUrl(previousRoute, previousParams),
            previousRoute,
            previousParams,
            toJSON() {
                return {
                    entryUrl: this.entryUrl,
                    url: this.url,
                    route: dehydrateRoute(this.route),
                    params: dehydrateParams(this.params),
                    previousUrl: this.previousUrl,
                    previousRoute: dehydrateRoute(this.previousRoute),
                    previousParams: dehydrateParams(this.previousParams),
                };
            },
        };
    },
    actions: {
        init: entryUrl => (getState, patchState, dispatchAction, execEffect) => {
            patchState({
                entryUrl,
            });

            return execEffect(initRouter, entryUrl, (route, params) =>
                dispatchAction(state.actions.handleRouteMatch(route, params))
            );
        },
        handleRouteMatch: (route, params) => (getState, patchState, dispatchAction) => {
            const oldState = getState();
            const newState = {
                url: routeToUrl(route, params),
                route,
                params,
                previousUrl: oldState.url,
                previousRoute: oldState.route,
                previousParams: oldState.params,
            };

            patchState(newState);

            return dispatchAction(route.action).then(componentModule => {
                if (getState().route !== route) {
                    // User has already switched the route
                    return componentModule;
                }

                return Promise.resolve(dispatchAction(componentModule.state.actions.enter(route, params))).then(
                    () => componentModule
                );
            });
        },
    },
});

export default renderChild;
