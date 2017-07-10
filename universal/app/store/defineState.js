const emptyObj = {};

function actionCreator(selectState, type, execAction) {
    return (...args) => {
        function wrappedExec(store, execEffect) {
            function getState() {
                return selectState(store.getState());
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

export default function defineState(descriptor) {
    const scope = descriptor.scope;

    function selectState(globalState) {
        return scope in globalState ? globalState[scope] : initialState;
    }

    if (!scope) {
        throw new Error("Missing scope");
    }

    const initialState = "initialState" in descriptor === true ? descriptor.initialState : emptyObj;
    const selectDescriptor = "select" in descriptor === true ? descriptor.select : emptyObj;
    const actionDescriptor = "actions" in descriptor === true ? descriptor.actions : emptyObj;
    const state = {
        actions: Object.keys(actionDescriptor).reduce((actions, actionName) => {
            const exec = actionDescriptor[actionName];
            const type = scope + "/" + actionName;

            actions[actionName] = actionCreator(selectState, type, exec);

            return actions;
        }, {}),
        select: Object.keys(selectDescriptor).reduce((select, selectorName) => {
            const selector = selectDescriptor[selectorName];

            return globalState => selector(selectState(globalState));
        }, {}),
    };

    return state;
}
