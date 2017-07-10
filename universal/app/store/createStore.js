import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import reducer from "./reducer";
import enhanceStore from "./enhanceStore";

export default function createStore(initialState) {
    return reduxCreateStore(reducer, initialState, compose(enhanceStore));
}
