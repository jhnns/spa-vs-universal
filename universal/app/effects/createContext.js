import isPromise from "is-promise";
import { actions as effectAction } from "./state";

class Context {
    constructor(store) {
        this.store = store;
    }
    exec(effect, ...args) {
        const result = effect(this.store)(...args);

        if (isPromise(result) === true) {
            const promise = result;

            this.store.dispatch(effectAction.addPendingEffect(effect, args, promise));
            promise.then(
                res => {
                    this.store.dispatch(effectAction.removePendingEffect(effect, args, promise));

                    return res;
                },
                err => {
                    this.store.dispatch(effectAction.removePendingEffect(effect, args, promise));

                    throw err;
                }
            );
        }

        return result;
    }
}

export default function createContext(store) {
    return new Context(store);
}
