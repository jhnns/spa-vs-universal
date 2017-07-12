import defineState from "../store/defineState";
import updateMap from "../../util/updateMap";
import addToSizedMap from "../../util/addToSizedMap";

const resolvedPromise = new Promise(resolve => resolve());

function patchIfStillCached(state, patchState, promiseFactory, value) {
    if (isInCache(state, promiseFactory)) {
        patchState({
            cache: updateMap(state.cache, promiseFactory, value),
        });
    }
}

export function isInCache(state, promiseFactory) {
    return state.cache.has(promiseFactory);
}

export function selectResult(state, promiseFactory) {
    const cache = state.cache;

    return isInCache(state, promiseFactory) ? cache.get(promiseFactory) : null;
}

export function selectResolved(state, promiseFactory) {
    const result = selectResult(state, promiseFactory);

    return result === null || result instanceof Error ? null : result;
}

export function selectError(state, promiseFactory) {
    const result = selectResult(state, promiseFactory);

    return result === null || result instanceof Error === false ? null : result;
}

export function selectPending(state, promiseFactory) {
    const result = selectResult(state, promiseFactory);

    return result === null;
}

export default function definePromiseCache({ scope, sizeLimit = 30 }) {
    function execute(promiseFactory) {
        return async (getState, patchState, dispatchAction) => {
            patchState({
                cache: addToSizedMap(getState().cache, sizeLimit, promiseFactory, null),
            });
            patchIfStillCached(getState(), patchState, promiseFactory, await promiseFactory().catch(e => e));
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
            execute,
            executeIfNotCached: promiseFactory => (getState, patchState, dispatchAction) => {
                if (isInCache(getState(), promiseFactory)) {
                    return resolvedPromise;
                }

                return execute(promiseFactory)(getState, patchState, dispatchAction);
            },
        },
    });
}
