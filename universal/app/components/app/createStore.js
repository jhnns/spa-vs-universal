import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";

export default function createStore(initialState) {
    return reduxCreateStore(defaultReducer, initialState, compose(applyMiddleware(reduxPromise)));
}
