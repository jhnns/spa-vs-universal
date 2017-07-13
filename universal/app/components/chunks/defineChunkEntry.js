import chunkEntries from "./chunkEntries";
import { state as chunkState } from "./chunks";

const has = Object.prototype.hasOwnProperty;

export default function defineChunkEntry(chunkEntry) {
    if (has.call(chunkEntry, "name") === false) {
        chunkEntry.name = chunkEntry.chunk;
    }
    chunkEntries.set(chunkEntry.name, chunkEntry);

    return chunkState.actions.ensure(chunkEntry);
}
