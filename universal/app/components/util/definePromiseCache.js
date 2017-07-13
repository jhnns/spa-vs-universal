import defineState from "../store/defineState";
import updateMap from "../../util/updateMap";
import addToSizedMap from "../../util/addToSizedMap";

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

export function selectPromise(state, promiseFactory) {
    const cache = state.cache;

    return isInCache(state, promiseFactory) ? cache.get(promiseFactory)[0] : null;
}

export function selectResult(state, promiseFactory) {
    const cache = state.cache;

    return isInCache(state, promiseFactory) ? cache.get(promiseFactory)[1] : null;
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
        return (getState, patchState, dispatchAction) => {
            const promise = promiseFactory();

            patchState({
                cache: addToSizedMap(getState().cache, sizeLimit, promiseFactory, [promise, null]),
            });

            return promise.catch(e => e).then(result => {
                patchIfStillCached(getState(), patchState, promiseFactory, [promise, result]);
                if (result instanceof Error) {
                    throw result;
                }
            });
        };
    }

    return defineState({
        scope: scope + "Cache",
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
                    return selectResult(getState(), promiseFactory);
                }

                return execute(promiseFactory)(getState, patchState, dispatchAction);
            },
        },
    });
}
