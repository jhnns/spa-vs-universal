import createContext from "../effects/createContext";

export default function effectsMiddleware(store) {
    const effectContext = createContext(store);
    const execEffect = effectContext.exec.bind(effectContext);
    const dispatchAction = store.dispatch.bind(store);

    return next => action => {
        function updateState(newState) {
            store.dispatch({
                type: action.scope + "/" + action.actionName + "/update",
                payload: newState,
            });
        }

        function getState() {
            return store.getState()[action.scope];
        }

        if (action.scope === undefined || action.executor === undefined || action.args === undefined) {
            return next(action);
        }

        return action.executor(...action.args)(getState, updateState, dispatchAction, execEffect);
    };
}
