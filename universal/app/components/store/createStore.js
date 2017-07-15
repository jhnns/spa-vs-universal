import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import effectMiddleware from "../../effects/effectMiddleware";
import reducer from "./reducer";
import enhanceStore from "./enhanceStore";

export default function createStore(stateScopes, initialState) {
    return reduxCreateStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(reduxThunk, effectMiddleware((effect, args) => effect(...args))),
            enhanceStore(stateScopes),
            // Use redux devtools when installed in the browser
            // @see https://github.com/zalmoxisus/redux-devtools-extension#implementation
            typeof devToolsExtension === "undefined" ? f => f : devToolsExtension() // eslint-disable-line no-undef
        )
    );
}
