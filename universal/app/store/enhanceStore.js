import effectExecutor from "../effects/executor";

function executeAction(store, execEffect, action) {
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

    return action.exec(getState, patchState, dispatchAction, execEffect);
}

export default function enhanceStore(createStore) {
    return (reducers, initialState, enhancers) => {
        const store = createStore(reducers, initialState, enhancers);
        const originalDispatch = store.dispatch;

        const enhancedStore = {
            ...store,
            dispatch(action) {
                if (typeof action.scope === "function" && typeof action.exec === "function") {
                    return executeAction(store, execEffect, action);
                }

                return originalDispatch.call(this, action);
            },
        };
        const execEffect = effectExecutor(enhancedStore);

        return enhancedStore;
    };
}
