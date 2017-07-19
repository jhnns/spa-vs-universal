import defineChunkEntry from "../../components/chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "error",
    context: contexts.chunkEntries,
    load: () => import("./error" /* webpackChunkName: "error" */),
});
