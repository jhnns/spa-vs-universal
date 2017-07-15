import defineState from "../store/defineState";
import contexts from "../../contexts";
import renderChild from "../util/renderChild";

const name = "chunks";

export function selectLoadedChunks(globalState) {
    return state.select(globalState).loadedEntries.map(entries => entries.chunk);
}

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        loadedEntries: [],
    },
    hydrate(dehydrated) {
        return {
            ...dehydrated,
            loadedEntries: dehydrated.loadedEntries.map(id => contexts.chunkEntries[id]),
            toJSON() {
                return {
                    ...this,
                    loadedEntries: this.loadedEntries.map(entry => entry.id),
                };
            },
        };
    },
    actions: {
        preload: () => (getState, patchState, dispatchAction) =>
            Promise.all(getState().loadedEntries.map(entry => entry.load())),
        import: chunkEntry => (getState, patchState, dispatchAction) =>
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
