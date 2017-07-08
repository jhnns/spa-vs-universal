import { createStore as reduxCreateStore, compose, applyMiddleware, combineReducers } from "redux";
import { get as getReducers } from "./reducers";

function combineAppReducers() {
    return combineReducers(getReducers());
}

// function trackPendingMiddleware(store) {
//     let pendingActions = 0;

//     function decreasePendingActions() {
//         pendingActions--;
//         if (pendingActions === 0) {
//             store.dispatch(appState.actions.hasPendingActions(false));
//         }
//     }

//     return next => action => {
//         const payload = action.payload;
//         const isPromise = typeof action.payload.then === "function";

//         if (isPromise === true) {
//             if (pendingActions === 0) {
//                 store.dispatch(appState.actions.hasPendingActions(true));
//             }
//             pendingActions++;
//             payload.then(decreasePendingActions);
//         }

//         return next(action);
//     };
// }

function replaceReducersMiddleware(store) {
    let knownReducers = getReducers();

    return next => action => {
        if (knownReducers !== getReducers()) {
            store.replaceReducer(combineAppReducers());
            knownReducers = getReducers();
        }

        return next(action);
    };
}

export default function createStore(initialState) {
    return reduxCreateStore(combineAppReducers(), initialState, compose(applyMiddleware(replaceReducersMiddleware)));
}
