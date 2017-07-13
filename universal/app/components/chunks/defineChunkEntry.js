import chunkEntries from "./chunkEntries";
import { state as chunkState } from "./chunks";

const has = Object.prototype.hasOwnProperty;

export default function defineChunkEntry(chunkEntry) {
    const load = chunkEntry.load;
    let result = null;

    if (has.call(chunkEntry, "name") === false) {
        chunkEntry.name = chunkEntry.chunk;
    }
    chunkEntry.load = () => load().then(r => (result = r));
    chunkEntry.get = () => result;
    chunkEntries.set(chunkEntry.name, chunkEntry);

    return chunkState.actions.ensure(chunkEntry);
}
