import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import effectMiddleware from "./effectMiddleware";
import createReducer from "./createReducer";
import enhanceStore from "./enhanceStore";

export default function createStore(stateContext, initialState) {
    return reduxCreateStore(
        createReducer(stateContext),
        initialState,
        compose(
            applyMiddleware(reduxThunk, effectMiddleware((effect, args) => effect(...args))),
            enhanceStore(stateContext),
            // Use redux devtools when installed in the browser
            // @see https://github.com/zalmoxisus/redux-devtools-extension#implementation
            typeof devToolsExtension === "undefined" ? f => f : devToolsExtension() // eslint-disable-line no-undef
        )
    );
}
