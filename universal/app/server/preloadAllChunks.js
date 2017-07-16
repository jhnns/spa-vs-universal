import contexts from "../contexts";

let promise = null;

export default function preloadAllChunks() {
    if (promise !== null) {
        return promise;
    }

    return (promise = Promise.all(Object.values(contexts.chunkEntries).map(entry => entry.load())));
}
