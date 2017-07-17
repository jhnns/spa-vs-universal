import contexts from "../contexts";

let promise = null;

export default function preloadAllChunkEntries() {
    if (promise !== null) {
        return promise;
    }

    return (promise = Promise.all(Object.values(contexts.chunkEntries).map(entry => entry.load())));
}
