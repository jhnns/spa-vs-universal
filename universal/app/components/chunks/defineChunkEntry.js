import chunkEntries from "./chunkEntries";
import { state as chunkState } from "./chunks";
import Placeholder from "../placeholder/placeholder";
import defineComponent from "../util/defineComponent";
import has from "../../util/has";

const emptyArr = [];

export default function defineChunkEntry(chunkEntry) {
    const load = chunkEntry.load;
    const childGenerator = has(chunkEntry, "placeholder") ? [chunkEntry.placeholder] : emptyArr;
    const ChunkEntryPlaceholder = defineComponent({
        connectToStore: {
            watch: [chunkState.select],
            mapToState() {
                return {
                    Component: chunkModule === null ? error : chunkModule.default,
                };
            },
        },
        render(props, state) {
            return (
                <Placeholder Component={state.Component} props={props.props}>
                    {childGenerator}
                </Placeholder>
            );
        },
    });
    let chunkModule = null;
    let error = null;

    if (has(chunkEntry, "name") === false) {
        chunkEntry.name = chunkEntry.chunk;
    }
    chunkEntry.load = () =>
        load().then(
            r => {
                error = null;
                chunkModule = r;

                return r;
            },
            e => {
                error = e;
                chunkModule = null;

                throw e;
            }
        );
    chunkEntry.get = () => chunkModule;
    chunkEntries.set(chunkEntry.name, chunkEntry);

    return {
        loadAction: chunkState.actions.ensure(chunkEntry),
        Placeholder: ChunkEntryPlaceholder,
    };
}
