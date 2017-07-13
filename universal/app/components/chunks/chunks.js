import defineState from "../store/defineState";
import chunkEntries from "./chunkEntries";
import renderChild from "../util/renderChild";
import definePromiseCache, { selectPromise, selectError, isInCache } from "../util/definePromiseCache";

const name = "chunks";

const chunkCache = definePromiseCache({
    scope: name,
    sizeLimit: Infinity,
});

export const state = defineState({
    scope: name,
    initialState: {
        loadedEntries: [],
    },
    actions: {
        preload: () => (getState, patchState, dispatchAction) =>
            Promise.all(
                getState().loadedEntries
                    .map(entryName => chunkEntries.get(entryName).load)
                    .map(promiseFactory => dispatchAction(chunkCache.actions.run(promiseFactory)))
            ),
        ensure: chunkEntry => (getState, patchState, dispatchAction) => {
            const promiseFactory = chunkEntry.load;
            const chunkCacheState = chunkCache.select();

            if (isInCache(chunkCacheState, promiseFactory) && selectError(chunkCacheState, promiseFactory) === null) {
                return selectPromise(chunkCacheState, promiseFactory);
            }

            return dispatchAction(chunkCache.actions.run(chunkEntry.load)).then(result => {
                patchState({
                    loadedEntries: getState().loadedEntries.concat(chunkEntry.name),
                });

                return result;
            });
        },
    },
});

export default renderChild;
