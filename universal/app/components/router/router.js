import defineState from "../store/defineState";
import initRouter from "../../effects/initRouter";
import routes from "../../routes";
import renderChild from "../util/renderChild";

function entryUrl(state) {
    return state.entryUrl;
}

function currentLocation(state) {
    const routeName = state.routeName;

    return {
        route: routeName === null ? null : routes[routeName],
        params: state.params,
    };
}

function previousLocation(state) {
    const routeName = state.previousRouteName;

    return {
        route: routeName === null ? null : routes[routeName],
        params: state.previousParams,
    };
}

export const state = defineState({
    scope: "router",
    hydrate(dehydratedState) {
        return {
            entryUrl: "",
            routeName: null,
            params: null,
            previousRouteName: null,
            previousParams: null,
            ...dehydratedState,
        };
    },
    actions: {
        init: entryUrl => (getState, patchState, dispatchAction) => {
            patchState({
                entryUrl,
            });
            initRouter(entryUrl, (routeName, urlParams, searchParams) => {
                dispatchAction(state.actions.handleRouteMatch(routeName, urlParams, searchParams));
            });
        },
        handleRouteMatch: (routeName, urlParams, searchParams) => async (
            getState,
            updateState,
            dispatchAction,
            execEffect
        ) => {
            const params = {
                ...searchParams,
                ...urlParams,
            };
            const oldState = getState();
            const newState = {
                routeName,
                params,
                previousRouteName: oldState.routeName,
                previousParams: oldState.params,
            };
            const route = currentLocation(newState).route;

            updateState(newState);

            const component = await route.component();

            dispatchAction(component.state.actions.enter(route, params));
        },
    },
    select: {
        entryUrl,
        currentLocation,
        previousLocation,
    },
});

export default renderChild;
