import defineState from "../store/defineState";
import chunkEntries from "./chunkEntries";
import renderChild from "../util/renderChild";

const name = "chunks";

export function selectLoadedChunks(globalState) {
    return state.select(globalState).loadedEntries.map(entryName => chunkEntries[entryName].chunk);
}

export const state = defineState({
    scope: name,
    initialState: {
        loadedEntries: [],
    },
    actions: {
        preload: () => (getState, patchState, dispatchAction) =>
            Promise.all(getState().loadedEntries.map(entryName => chunkEntries[entryName].load())),
        ensure: chunkEntry => (getState, patchState, dispatchAction) => {
            const entryName = chunkEntry.name;

            return chunkEntry.load().then(result => {
                if (getState().loadedEntries.indexOf(entryName) === -1) {
                    patchState({
                        loadedEntries: getState().loadedEntries.concat(entryName),
                    });
                }

                return result;
            });
        },
    },
});

export default renderChild;
