import addToSizedMap from "./addToSizedMap";

export default class PromiseCache {
    constructor({ sizeLimit }) {
        this.sizeLimit = sizeLimit;
        this.cache = new Map();
    }

    has(promiseFactory) {
        return this.cache.has(promiseFactory);
    }

    getPromise(promiseFactory) {
        return this.has(promiseFactory) ? this.cache.get(promiseFactory)[0] : null;
    }

    getResult(promiseFactory) {
        return this.has(promiseFactory) ? this.cache.get(promiseFactory)[1] : null;
    }

    getResolved(promiseFactory) {
        const result = this.getResult(promiseFactory);

        return result === null || result instanceof Error ? null : result;
    }

    getError(promiseFactory) {
        const result = this.getResult(promiseFactory);

        return result === null || result instanceof Error === false ? null : result;
    }

    isPending(promiseFactory) {
        return this.getResult(promiseFactory) === null;
    }

    toJSON() {
        return undefined;
    }

    execute(promiseFactory) {
        const promise = promiseFactory();

        addToSizedMap(this.cache, this.sizeLimit, promiseFactory, [promise, null]);

        return promise.catch(e => e).then(result => {
            if (this.cache.has(promiseFactory)) {
                this.cache.set(promiseFactory, [promise, result]);
            }

            if (result instanceof Error) {
                throw result;
            }

            return result;
        });
    }

    executeIfNotCached(promiseFactory) {
        if (this.has(promiseFactory)) {
            return this.getResult(promiseFactory);
        }

        return this.execute(promiseFactory);
    }
}
