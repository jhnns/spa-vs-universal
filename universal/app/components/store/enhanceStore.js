import isPromise from "is-promise";

const resolved = Promise.resolve();

function isDefined(result) {
    return result !== null && result !== undefined;
}

export default function enhanceStore(stateContext) {
    return createStore => (reducers, initialState, enhancers) => {
        const store = createStore(reducers, initialState, enhancers);
        const dispatch = store.dispatch;
        const enhancedStore = {
            ...store,
            stable: resolved,
            context: stateContext,
            dispatch(action) {
                const result = dispatch.call(this, action);

                if (isPromise(result)) {
                    enhancedStore.stable = Promise.all([enhancedStore.stable, result]);
                }

                return result;
            },
            watch(select, onChange) {
                let oldValue = select(this.getState());

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
