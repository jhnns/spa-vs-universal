import createActions from "../store/createActions";
import getSearchParams from "../effects/getSearchParams";
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
    handleRouteMatch: (routeName, urlParams) => (getState, updateState, dispatchAction, execEffect) => {
        const params = execEffect(getSearchParams);

        Object.assign(params, urlParams, params);

        console.log("handleRoute", routeName, params);
    },
});

export function getCurrentRoute(state) {
    const routeName = state[scope].routeName;

    return routeName === null ? "" : routes[routeName];
}

export function getPreviousRoute(state) {
    const routeName = state[scope].previousRouteName;

    return routeName === null ? "" : routes[routeName];
}
