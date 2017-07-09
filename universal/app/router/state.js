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
    init: entryUrl => (getState, updateState, exec) => {
        updateState({
            ...initialState,
            entryUrl,
        });
        exec(handleUserNavigation);
    },
    handleChange: url => (getState, updateState, exec) => {},
});
