import Namespace from "../util/namespace";
import defineState from "../util/defineState";
import handleUserNavigation from "../effects/registry/handleUserNavigation";

const namespace = new Namespace(module.id).get("router");
const initialState = {
    entryUrl: "",
    route: null,
    params: null,
    previousRoute: null,
    previousParams: null,
};

export default defineState(namespace, {
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
