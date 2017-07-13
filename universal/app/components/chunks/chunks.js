import defineState from "../store/defineState";
import chunkEntries from "./chunkEntries";
import renderChild from "../util/renderChild";
import PromiseCache from "../../util/promiseCache";

const name = "chunks";
const chunkCacheOptions = {
    sizeLimit: Infinity,
};

export const state = defineState({
    scope: name,
    initialState: {
        loadedEntries: [],
    },
    hydrate(dehydratedState) {
        dehydratedState.chunkCache = new PromiseCache(chunkCacheOptions);

        return dehydratedState;
    },
    actions: {
        preload: () => (getState, patchState, dispatchAction) =>
            Promise.all(
                getState().loadedEntries
                    .map(entryName => chunkEntries.get(entryName).load)
                    .map(promiseFactory => getState().chunkCache.execute(promiseFactory))
            ),
        ensure: chunkEntry => (getState, patchState, dispatchAction) => {
            const promiseFactory = chunkEntry.load;
            const chunkCache = getState().chunkCache;

            if (chunkCache.has(promiseFactory)) {
                return chunkCache.getPromise(promiseFactory);
            }

            return chunkCache.execute(promiseFactory).then(result => {
                patchState({
                    loadedEntries: getState().loadedEntries.concat(chunkEntry.name),
                });

                return result;
            });
        },
    },
});

export default renderChild;
