import defineChunkEntry from "../../components/chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "about",
    context: contexts.chunkEntries,
    load: () => import("./about" /* webpackChunkName: "about" */),
});
