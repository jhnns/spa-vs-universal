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
    function dispatchRemove() {
        store.dispatch(storeState.actions.removePendingAction(action));
    }

    store.dispatch(storeState.actions.addPendingAction(action));

    return promise.then(
        res => {
            setTimeout(dispatchRemove, 0);

            return res;
        },
        err => {
            setTimeout(dispatchRemove, 0);

            throw err;
        }
    );
}

function isDefined(result) {
    return result !== null && result !== undefined;
}

export default function enhanceStore(createStore) {
    return (reducers, initialState, enhancers) => {
        const store = createStore(reducers, initialState, enhancers);
        const originalDispatch = store.dispatch;

        const enhancedStore = {
            ...store,
            dispatch(action) {
                if (typeof action.scope === "function" && typeof action.exec === "function") {
                    return executeAction(enhancedStore, action);
                }

                return originalDispatch.call(this, action);
            },
            watch(select, onChange) {
                let oldValue;

                return this.subscribe(() => {
                    const newValue = select(this.getState());

                    if (oldValue !== newValue) {
                        onChange(newValue, oldValue);
                        oldValue = newValue;
                    }
                });
            },
            when(select, condition = isDefined) {
                return new Promise((resolve, reject) => {
                    const unsubscribe = this.watch(select, value => {
                        if (condition(value) === true) {
                            unsubscribe();
                            resolve(value);
                        }
                    });
                });
            },
        };

        return enhancedStore;
    };
}
