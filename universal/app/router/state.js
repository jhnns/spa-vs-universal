import Namespace from "../util/namespace";
import defineState from "../util/defineState";
import defineMutation from "../util/defineMutation";
import handleUserNavigation from "../effects/registry/handleUserNavigation";
import createRouter from "./createRouter";

const namespace = new Namespace(module.id).get("router");
const initialState = {
    entryUrl: "",
    route: null,
    params: null,
    previousRoute: null,
    previousParams: null,
};

const update = defineMutation(namespace.get("update"), (route, params) => ({ route, params }));
const setEntryUrl = defineMutation(namespace.get("setEntryUrl"), entryUrl => ({ entryUrl }));

export default defineState(namespace, {
    actions: {
        initialize: entryUrl => (dispatch, exec, getState) => {
            dispatch(update.create(route, params));
            exec(handleUserNavigation);
        },
        handleChange: url => (dispatch, exec, getState) => {},
    },
    reducer(state = initialState, action) {
        switch (action.type) {
            case update.type: {
                return {
                    ...state,
                    route: action.payload.route,
                    params: action.payload.params,
                    previousRoute: state.route,
                    previousParams: state.params,
                };
            }
            case setEntryUrl.type: {
                return {
                    ...state,
                    route: action.payload.route,
                    params: action.payload.params,
                    previousRoute: state.route,
                    previousParams: state.params,
                };
            }
        }

        return state;
    },
});
