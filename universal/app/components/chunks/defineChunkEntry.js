import { state as chunkState } from "./chunks";
import Placeholder from "../placeholder/placeholder";
import defineComponent from "../util/defineComponent";
import has from "../../util/has";

const emptyArr = [];

export default function defineChunkEntry(descriptor) {
    const chunk = descriptor.chunk;
    const context = descriptor.context;

    if (typeof chunk !== "string") {
        throw new Error("Chunk name is missing");
    }
    if (context === undefined) {
        throw new Error("Chunk entry context is missing");
    }

    const id = has(descriptor, "name") ? descriptor.chunk + "/" + descriptor.name : descriptor.chunk;

    if (has(context, id)) {
        throw new Error(`Chunk entry ${ id } is already defined on given chunk entry context`);
    }

    const load = descriptor.load;
    const childGenerator = has(descriptor, "Placeholder") ? [descriptor.Placeholder] : emptyArr;
    let chunkModule = null;
    let error = null;
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
    const chunkEntry = {
        id,
        load: () => {
            if (chunkModule !== null) {
                return Promise.resolve(chunkModule);
            }

            return load().then(
                result => {
                    error = null;
                    chunkModule = result;

                    return result;
                },
                err => {
                    error = err;
                    chunkModule = null;

                    throw err;
                }
            );
        },
        Placeholder: ChunkEntryPlaceholder,
    };

    chunkEntry.import = chunkState.actions.import(chunkEntry);

    context[id] = chunkEntry;

    return chunkEntry;
}
