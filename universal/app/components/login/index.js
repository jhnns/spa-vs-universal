import defineChunkEntry from "../chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "login",
    context: contexts.chunkEntries,
    load: () => import("./login" /* webpackChunkName: "login" */),
});
