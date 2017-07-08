import isPromise from "is-promise";
import registry from "./registry";

function splice(pending, instance) {
    pending.splice(pending.indexOf(instance), 1);
}

function addPendingEffect(pending, executor, args, promise) {
    const instance = {
        executor,
        promise,
        args,
    };

    pending.push(instance);

    promise.then(
        res => {
            splice(pending, instance);

            return res;
        },
        err => {
            splice(pending, instance);

            throw err;
        }
    );
}

class Context {
    constructor() {
        this.pending = [];
    }
    exec(name, ...args) {
        const effect = registry.get(name);
        const result = effect(this, ...args);

        if (isPromise(result) === true) {
            addPendingEffect(effect, args, result);
        }

        return result;
    }
}

export default function createContext() {
    return new Context();
}
