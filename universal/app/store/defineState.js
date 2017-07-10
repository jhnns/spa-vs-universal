const emptyObj = {};

function actionCreator(scope, type, selectHydratedState, execAction) {
    return (...args) => {
        function wrappedExec(store, execEffect) {
            function getState() {
                return selectHydratedState(store);
            }

            function patchState(patch) {
                dispatchAction({
                    type: type + "/patch",
                    payload: {
                        ...getState(),
                        ...patch,
                    },
                });
            }

            function dispatchAction(newAction) {
                store.dispatch(newAction);
            }

            return execAction(...args)(getState, patchState, dispatchAction, execEffect);
        }

        return {
            type,
            exec: wrappedExec,
        };
    };
}

function enhanceStore(store) {
    if ("dehydrators" in store === false) {
        store.dehydrators = new Map();
    }
}

export default function defineState(descriptor) {
    const scope = descriptor.scope;

    function selectState(globalState) {
        return scope in globalState ? globalState[scope] : emptyObj;
    }

    function selectHydratedState(store) {
        const hydrate = descriptor.hydrate;
        let state = selectState(store.getState());

        if (store.dehydrators.has(scope) === false) {
            if (typeof hydrate === "function") {
                state = hydrate(state);
            }
            store.dehydrators.set(scope, dehydrateState);
        }

        return state;
    }

    function dehydrateState(hydratedState) {
        const dehydrate = descriptor.dehydrate;

        return typeof dehydrate === "function" ? dehydrate(hydratedState) : hydratedState;
    }

    if (typeof scope !== "string") {
        throw new Error("Missing scope");
    }

    const selectDescriptor = "select" in descriptor === true ? descriptor.select : emptyObj;
    const actionDescriptor = "actions" in descriptor === true ? descriptor.actions : emptyObj;
    const state = {
        actions: Object.keys(actionDescriptor).reduce((actions, actionName) => {
            const execAction = actionDescriptor[actionName];
            const type = scope + "/" + actionName;

            actions[actionName] = actionCreator(scope, type, selectHydratedState, execAction);

            return actions;
        }, {}),
        select: Object.keys(selectDescriptor).reduce((select, selectorName) => {
            const selector = selectDescriptor[selectorName];

            return globalState => selector(selectState(globalState));
        }, {}),
    };

    return state;
}
