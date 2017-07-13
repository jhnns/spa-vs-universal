function executeAction(store, action) {
    function getState() {
        return action.scope(store.getState());
    }

    function patchState(patch) {
        return dispatchAction({
            type: action.type + "/patch",
            payload: {
                ...getState(),
                ...patch,
            },
        });
    }

    function dispatchAction(newAction) {
        return store.dispatch(newAction);
    }

    function execEffect(effect, ...args) {
        return effect(...args);
    }

    return action.exec(getState, patchState, dispatchAction, execEffect);
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
                    let unsubscribe = Function.prototype;

                    function check(value) {
                        const result = condition(value);

                        if (result === true) {
                            unsubscribe();
                            resolve(value);
                        }

                        return result;
                    }

                    if (check(select(this.getState())) === false) {
                        unsubscribe = this.watch(select, check);
                    }
                });
            },
        };

        return enhancedStore;
    };
}
