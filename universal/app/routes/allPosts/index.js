import defineChunkEntry from "../../components/chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    name: "allPosts",
    chunk: "posts",
    context: contexts.chunkEntries,
    load: () => import("./allPosts" /* webpackChunkName: "posts" */),
});
