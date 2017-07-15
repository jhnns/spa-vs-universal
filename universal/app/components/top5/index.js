import defineChunkEntry from "../chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    name: "top5",
    chunk: "posts",
    context: contexts.chunkEntries,
    load: () => import("./top5" /* webpackChunkName: "posts" */),
});
