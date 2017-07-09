import createActions from "../store/createActions";
import getSearchParams from "../effects/getSearchParams";
import initRouter from "../effects/initRouter";
import routes from "../routes";

const scope = "router";
const initialState = {
    entryUrl: "",
    routeName: null,
    params: null,
    previousRouteName: null,
    previousParams: null,
};

export const actions = createActions(scope, {
    init: entryUrl => (getState, updateState, dispatchAction, execEffect) => {
        updateState({
            ...initialState,
            entryUrl,
        });
        execEffect(initRouter, entryUrl);
    },
    handleRouteMatch: (routeName, urlParams, searchParams) => (getState, updateState, dispatchAction, execEffect) => {
        const params = execEffect(getSearchParams);

        console.log(params);

        Object.assign(params, urlParams, params);

        console.log("handleRoute", routeName, params);
    },
});

export function getRouterState(state) {
    return state[scope];
}

export function getEntryUrl(state) {
    return getRouterState(state).entryUrl;
}

export function getCurrentRoute(state) {
    const routeName = getRouterState(state).routeName;

    return routeName === null ? "" : routes[routeName];
}

export function getPreviousRoute(state) {
    const routeName = getRouterState(state).previousRouteName;

    return routeName === null ? "" : routes[routeName];
}
