import isPromise from "is-promise";
import { state as storeState } from "./store";

function executeAction(store, action) {
    function getState() {
        return action.scope(store.getState());
    }

    function patchState(patch) {
        dispatchAction({
            type: action.type + "/patch",
            payload: {
                ...getState(),
                ...patch,
            },
        });
    }

    function dispatchAction(newAction) {
        store.dispatch(newAction);
    }

    const result = action.exec(getState, patchState, dispatchAction);

    return isPromise(result) === true ? handleAsyncAction(store, action, result) : result;
}

function handleAsyncAction(store, action, promise) {
    store.dispatch(storeState.actions.addPendingAction(action));

    return promise.then(
        res => {
            store.dispatch(storeState.actions.removePendingAction(action));

            return res;
        },
        err => {
            store.dispatch(storeState.actions.removePendingAction(action));

            throw err;
        }
    );
}

export default function enhanceStore(createStore) {
    return (reducers, initialState, enhancers) => {
        const store = createStore(reducers, initialState, enhancers);
        const originalDispatch = store.dispatch;

        const enhancedStore = {
            ...store,
            dispatch(action) {
                if (typeof action.scope === "function" && typeof action.exec === "function") {
                    return executeAction(store, action);
                }

                return originalDispatch.call(this, action);
            },
        };

        return enhancedStore;
    };
}
