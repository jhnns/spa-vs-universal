import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import reducer from "./reducer";
import effectsMiddleware from "./effectsMiddleware";

export default function createStore(initialState) {
    return reduxCreateStore(reducer, initialState, compose(applyMiddleware(reduxLogger, effectsMiddleware)));
}
