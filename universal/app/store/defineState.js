const emptyObj = {};

function actionCreator(state, type, executor) {
    return (...args) => {
        function wrappedExecutor(store, execEffect) {
            function getState() {
                return state.select(store.getState());
            }

            function patchState(patch) {
                dispatchAction({
                    type: type + "/patch",
                    payload: Object.assign(patch, getState(), patch),
                });
            }

            function dispatchAction(newAction) {
                store.dispatch(newAction);
            }

            return executor(getState, patchState, dispatchAction, execEffect);
        }

        return {
            type,
            executor: wrappedExecutor,
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
        select: Object.keys(selectDescriptor).reduce((select, selectorName) => {
            const selector = selectDescriptor[selectorName];

            return globalState => selector(selectState(globalState));
        }),
        actions: Object.keys(actionDescriptor).reduce((actions, actionName) => {
            const executor = actionDescriptor[actionName];
            const type = scope + "/" + actionName;

            actions[actionName] = actionCreator(state, type, executor);

            return actions;
        }),
    };

    return state;
}
