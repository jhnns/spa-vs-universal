import defineChunkEntry from "../../components/chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "session",
    context: contexts.chunkEntries,
    load: () => import("./session" /* webpackChunkName: "session" */),
});
