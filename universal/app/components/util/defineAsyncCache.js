import defineState from "../store/defineState";
import updateMap from "../../util/updateMap";
import addToSizedMap from "../../util/addToSizedMap";

const resolvedPromise = new Promise(resolve => resolve());

function patchIfStillCached(patchState, cache, key, value) {
    if (cache.has(key) === true) {
        patchState(updateMap(cache, key, value));
    }
}

export function applyToState(scope, cache, promiseFactory, state) {
    const result = cache.has(promiseFactory) === true ? cache.get(promiseFactory) : null;
    const hasResult = result !== null;
    const isError = result instanceof Error === true;
    const resolved = hasResult && isError === false ? result : null;
    const error = hasResult && isError ? result : null;

    state[scope + "Pending"] = hasResult === false;
    state[scope + "Error"] = error;
    state[scope] = resolved;
}

export default function defineAsyncCache({ scope, sizeLimit = 30 }) {
    function run(promiseFactory) {
        return async (getState, patchState, dispatchAction) => {
            const cache = getState();

            patchState(addToSizedMap(cache, sizeLimit, promiseFactory, null));
            patchIfStillCached(patchState, cache, promiseFactory, await promiseFactory().catch(e => e));
        };
    }

    return defineState({
        scope,
        hydrate() {
            const map = new Map();

            map.toJSON = () => undefined;

            return map;
        },
        actions: {
            run,
            runIfNotCached: promiseFactory => (getState, patchState, dispatchAction) => {
                const cache = getState();

                if (cache.has(promiseFactory) === true) {
                    return resolvedPromise;
                }

                return run(promiseFactory)(getState, patchState, dispatchAction);
            },
        },
    });
}
