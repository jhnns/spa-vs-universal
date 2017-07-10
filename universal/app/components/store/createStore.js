import { createStore as reduxCreateStore, compose } from "redux";
import reducer from "./reducer";
import enhanceStore from "./enhanceStore";

export default function createStore(initialState) {
    return reduxCreateStore(
        reducer,
        initialState,
        compose(
            enhanceStore,
            // Use redux devtools when installed in the browser
            // @see https://github.com/zalmoxisus/redux-devtools-extension#implementation
            typeof devToolsExtension === "undefined" ? f => f : devToolsExtension() // eslint-disable-line no-undef
        )
    );
}
