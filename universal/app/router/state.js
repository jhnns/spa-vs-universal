import handleUserNavigation from "../effects/handleUserNavigation";
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

export const actions = createActions(scope, {
    init: entryUrl => (getState, updateState, dispatchAction, execEffect) => {
        updateState({
            ...initialState,
            entryUrl,
            router: createRouter(routes, actions.handleRoute),
        });
        execEffect(handleUserNavigation);
        dispatchAction(actions.handleChange(entryUrl));
    },
    handleChange: url => (getState, updateState, dispatchAction, execEffect) => {
        getState().router(url);
    },
    handleRoute: urlParams => (getState, updateState, dispatchAction, execEffect) => {},
});

export const selectors = {
    getEntryUrl(state) {
        return state[scope].entryUrl;
    },
};
