import handleUserNavigation from "../effects/handleUserNavigation";
import createActions from "../store/createActions";

export const scope = "router";

const initialState = {
    entryUrl: "",
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
        });
        execEffect(handleUserNavigation);
    },
    handleChange: url => (getState, updateState, dispatchAction, execEffect) => {},
});
