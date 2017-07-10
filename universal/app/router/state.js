import defineState from "../store/defineState";
import initRouter from "../effects/initRouter";
import routes from "../routes";

export default defineState({
    scope: "router",
    initialState: {
        entryUrl: "",
        routeName: null,
        params: null,
        previousRouteName: null,
        previousParams: null,
    },
    actions: {
        init: entryUrl => (getState, updateState, dispatchAction, execEffect) => {
            updateState({
                ...getState(),
                entryUrl,
            });
            execEffect(initRouter, entryUrl);
        },
        handleRouteMatch: (routeName, urlParams, searchParams) => (
            getState,
            updateState,
            dispatchAction,
            execEffect
        ) => {
            Object.assign(searchParams, urlParams);

            const params = searchParams;
            const state = getState();
            const newState = {
                ...state,
                routeName,
                params,
                previousRouteName: state.routName,
                previousParams: state.params,
            };

            updateState(newState);
        },
    },
    select: {
        entryUrl() {

        },
    },
});

export default state;

export function getEntryUrl(state) {
    return getRouterState(state).entryUrl;
}

export function getCurrentLocation(state) {
    const routeName = getRouterState(state).routeName;

    return {
        route: routeName === null ? null : routes[routeName],
        params: getRouterState(state).params,
    };
}

export function getPreviousLocation(state) {
    const routeName = getRouterState(state).previousRouteName;

    return {
        route: routeName === null ? null : routes[routeName],
        params: getRouterState(state).previousParams,
    };
}
