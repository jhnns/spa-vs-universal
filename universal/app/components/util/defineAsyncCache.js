import defineState from "../store/defineState";
import updateMap from "../../util/updateMap";
import addToSizedMap from "../../util/addToSizedMap";

const resolvedPromise = new Promise(resolve => resolve());

function patchIfStillCached(patchState, cache, key, value) {
    if (cache.has(key) === true) {
        patchState({
            cache: updateMap(cache, key, value),
        });
    }
}

export function selectResult(state, promiseFactory) {
    const cache = state.cache;

    return cache.has(promiseFactory) === true ? cache.get(promiseFactory) : null;
}

export function selectResolved(state, promiseFactory) {
    const result = selectResult(state, promiseFactory);

    return result === null || result instanceof Error === true ? null : result;
}

export function selectError(state, promiseFactory) {
    const result = selectResult(state, promiseFactory);

    return result === null || result instanceof Error === false ? null : result;
}

export function selectPending(state, promiseFactory) {
    const result = selectResult(state, promiseFactory);

    return result === null;
}

export default function defineAsyncCache({ scope, sizeLimit = 30 }) {
    function run(promiseFactory) {
        return async (getState, patchState, dispatchAction) => {
            patchState({
                cache: addToSizedMap(getState().cache, sizeLimit, promiseFactory, null),
            });
            patchIfStillCached(patchState, getState().cache, promiseFactory, await promiseFactory().catch(e => e));
        };
    }

    return defineState({
        scope,
        hydrate() {
            return {
                cache: new Map(),
                toJSON: () => undefined,
            };
        },
        actions: {
            run,
            runIfNotCached: promiseFactory => (getState, patchState, dispatchAction) => {
                if (getState().cache.has(promiseFactory) === true) {
                    return resolvedPromise;
                }

                return run(promiseFactory)(getState, patchState, dispatchAction);
            },
        },
    });
}
