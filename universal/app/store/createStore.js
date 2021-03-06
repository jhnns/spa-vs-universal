import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import effectMiddleware from "./effectMiddleware";
import thunkMiddleware from "./thunkMiddleware";
import createReducer from "./createReducer";
import enhanceStore from "./enhanceStore";

const useReduxDevTools = process.env.NODE_ENV === "development" && typeof devToolsExtension === "function"; // eslint-disable-line no-undef

export default function createStore(stateContext, initialState, effectContext) {
    return reduxCreateStore(
        createReducer(stateContext),
        initialState,
        compose(
            applyMiddleware(thunkMiddleware(), effectMiddleware((effect, args) => effect(effectContext)(...args))),
            enhanceStore(stateContext),
            // Use redux devtools when installed in the browser
            // @see https://github.com/zalmoxisus/redux-devtools-extension#implementation
            useReduxDevTools ? devToolsExtension() : f => f // eslint-disable-line no-undef
        )
    );
}
