import isPromise from "is-promise";
import effectState from "./state";

export default function executor(store) {
    return (effect, ...args) => {
        const result = effect(store)(...args);

        if (isPromise(result) === true) {
            const promise = result;

            store.dispatch(effectState.actions.addPendingEffect(effect, args, promise));
            promise.then(
                res => {
                    store.dispatch(effectState.actions.removePendingEffect(effect, args, promise));

                    return res;
                },
                err => {
                    store.dispatch(effectState.actions.removePendingEffect(effect, args, promise));

                    throw err;
                }
            );
        }

        return result;
    };
}
