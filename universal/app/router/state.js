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

        for (const key of Object.keys(urlParams)) {
            params.set(key, urlParams[key]);
        }

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
        dispatchAction(actions.handleChange(entryUrl));
    },
    handleChange: url => (getState, updateState, dispatchAction, execEffect) => {
        getState().router(url);
    },
    handleRoute: (route, params) => (getState, updateState, dispatchAction, execEffect) => {
        console.log("handleRoute", route, params);
    },
});

export function getEntryUrl(state) {
    return state[scope].entryUrl;
}
