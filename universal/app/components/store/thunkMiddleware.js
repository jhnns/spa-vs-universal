import { createEffectAction } from "./effectMiddleware";

function executeAction(action, dispatchAction, getState) {
    function execEffect(effect, ...args) {
        return dispatchAction(createEffectAction(effect, args));
    }

    return action(dispatchAction, getState, execEffect);
}

export default function thunkMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === "function") {
            return executeAction(action, dispatch, getState);
        }

        return next(action);
    };
}
