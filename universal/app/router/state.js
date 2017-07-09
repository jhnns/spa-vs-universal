import handleUserNavigation from "../effects/handleUserNavigation";
import getSearchParams from "../effects/getSearchParams";
import createActions from "../store/createActions";
import createRouter from "./createRouter";
import routes from "../routes";

const scope = "router";

const initialState = {
    entryUrl: "",
    router: null,
    route: null,
    params: null,
    previousRoute: null,
    previousParams: null,
};

function createRouteHandler(dispatchAction, execEffect) {
    return (route, urlParams) => {
        const params = execEffect(getSearchParams);

        Object.assign(params, urlParams, params);

        dispatchAction(actions.handleRoute(route, params));
    };
}

export const actions = createActions(scope, {
    init: entryUrl => (getState, updateState, dispatchAction, execEffect) => {
        updateState({
            ...initialState,
            entryUrl,
            router: createRouter(routes, createRouteHandler(dispatchAction, execEffect)),
        });
        execEffect(handleUserNavigation);
    },
    handleChange: pathname => (getState, updateState, dispatchAction, execEffect) => {
        getState().router(pathname);
    },
    handleRoute: (route, params) => (getState, updateState, dispatchAction, execEffect) => {
        console.log("handleRoute", route, params);
    },
});

export function getEntryUrl(state) {
    return state[scope].entryUrl;
}
