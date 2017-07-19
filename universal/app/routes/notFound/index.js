import defineChunkEntry from "../../components/chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "notFound",
    context: contexts.chunkEntries,
    load: () => import("./notFound" /* webpackChunkName: "notFound" */),
});
