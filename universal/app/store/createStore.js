import { createStore as reduxCreateStore, compose, applyMiddleware, combineReducers } from "redux";
import { get as getReducers } from "./reducers";

function combineAppReducers() {
    return combineReducers(getReducers());
}

function replaceReducersMiddleware() {
    let knownReducers = getReducers();

    return store => next => action => {
        if (knownReducers !== getReducers()) {
            store.replaceReducer(combineAppReducers());
            knownReducers = getReducers();
        }

        return next(action);
    };
}

function effectsMiddleware(effectContext) {
    return store => {
        function exec(effect, ...args) {
            args.push(store);
            effectContext.exec(effect);
        }

        return next => action => {
            if (typeof action !== "function") {
                next(action);

                return;
            }

            console.log("bla");
        };
    };
}

export default function createStore(initialState) {
    return reduxCreateStore(combineAppReducers(), initialState, compose(applyMiddleware(replaceReducersMiddleware())));
}
