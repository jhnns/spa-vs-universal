import defineState from "../store/defineState";
import registries from "../../registries";
import renderChild from "../util/renderChild";

const name = "chunks";

export function selectLoadedChunks(globalState) {
    return state.select(globalState).loadedEntries.map(entries => entries.chunk);
}

export const state = defineState({
    scope: name,
    context: registries.stateContext,
    initialState: {
        loadedEntries: [],
    },
    hydrate(dehydrated) {
        return {
            ...dehydrated,
            loadedEntries: dehydrated.loadedEntries.map(entryName => registries.chunkEntries[entryName]),
            toJSON() {
                return {
                    ...this,
                    loadedEntries: this.loadedEntries.map(entry => entry.name),
                };
            },
        };
    },
    actions: {
        preload: () => (getState, patchState, dispatchAction) =>
            Promise.all(getState().loadedEntries.map(entry => entry.load())),
        ensure: chunkEntry => (getState, patchState, dispatchAction) =>
            chunkEntry.load().then(result => {
                if (getState().loadedEntries.indexOf(chunkEntry) === -1) {
                    patchState({
                        loadedEntries: getState().loadedEntries.concat(chunkEntry),
                    });
                }

                return result;
            }),
    },
});

export default renderChild;
