export default function preloadChunkEntries(chunkEntries) {
    return Promise.all(chunkEntries.map(entry => entry.load()));
}
