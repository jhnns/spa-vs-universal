import has from "../../util/has";

export default function effectMiddleware(execEffect) {
    return store => next => action => {
        if (has(action, "payload")) {
            const payload = action.payload;

            if (typeof payload.effect === "function" && Array.isArray(payload.args)) {
                return execEffect(payload.effect, payload.args);
            }
        }

        return next(action);
    };
}