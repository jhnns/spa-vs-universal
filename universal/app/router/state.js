import defineState from "../util/defineState";
import handleUserNavigation from "../effects/registry/handleUserNavigation";
import namespace from "../store/namespace";

const initialState = {
    entryUrl: "",
    route: null,
    params: null,
    previousRoute: null,
    previousParams: null,
};

export default defineState(namespace.claim("router"), {
    actions: {
        init: entryUrl => (getState, updateState, exec) => {
            updateState({
                ...initialState,
                entryUrl,
            });
            exec(handleUserNavigation);
        },
        handleChange: url => (getState, updateState, exec) => {},
    },
});
