import createContext from "../effects/createContext";

export default function effectsMiddleware(store) {
    const effectContext = createContext(store);
    const execEffect = effectContext.exec.bind(effectContext);

    return next => action => {
        function getState() {
            return store.getState()[action.scope];
        }

        function updateState(newState) {
            store.dispatch({
                type: action.scope + "/" + action.actionName + "/update",
                payload: newState,
            });
        }

        function dispatchAction(newAction) {
            newAction.meta = Object.assign({}, newAction.meta);
            newAction.meta.referrer = action;
            store.dispatch(newAction);
        }

        if (action.scope === undefined || action.executor === undefined || action.args === undefined) {
            return next(action);
        }

        return action.executor(...action.args)(getState, updateState, dispatchAction, execEffect);
    };
}
