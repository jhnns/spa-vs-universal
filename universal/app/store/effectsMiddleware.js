import createContext from "../effects/createContext";

export default function effectsMiddleware(store) {
    const effectContext = createContext(store);
    const exec = effectContext.exec.bind(effectContext);
    const getState = store.getState.bind(store);

    return next => action => {
        function dispatchUpdateAction(newState) {
            store.dispatch({
                type: action.scope + "/update",
                scope: action.scope,
                payload: newState,
            });
        }

        if (action.scope === undefined || action.executor === undefined || action.args === undefined) {
            return next(action);
        }

        return action.executor(...action.args)(getState, dispatchUpdateAction, exec);
    };
}
