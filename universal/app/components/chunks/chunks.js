import defineState from "../store/defineState";
import contexts from "../../contexts";
import renderChild from "../util/renderChild";

const name = "chunks";

function addIfNecessary(chunkEntry, getState, patchState) {
    const loadedEntries = getState().loadedEntries;

    if (loadedEntries.indexOf(chunkEntry) === -1) {
        patchState({
            loadedEntries: loadedEntries.concat(chunkEntry),
        });
    }
}

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
        console.log("hydrate");

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
        import: chunkEntry => (getState, patchState, dispatchAction) => {
            const entryModule = chunkEntry.get();

            if (entryModule !== null) {
                // In case the entryModule is already loaded into the application,
                // we need to add it synchronously to the store because the import action
                // might have been triggered during a server render.
                addIfNecessary(chunkEntry, getState, patchState);

                return Promise.resolve(entryModule);
            }

            return chunkEntry.load().then(chunkEntry => {
                addIfNecessary(chunkEntry, getState, patchState);

                return chunkEntry;
            });
        },
    },
});

export default renderChild;
