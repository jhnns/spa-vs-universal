import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import reducer from "./reducer";
import effectsMiddleware from "./effectsMiddleware";
import addDehydrators from "./addDehydrators";

export default function createStore(initialState) {
    const store = reduxCreateStore(reducer, initialState, compose(applyMiddleware(effectsMiddleware), addDehydrators));

    return store;
}
