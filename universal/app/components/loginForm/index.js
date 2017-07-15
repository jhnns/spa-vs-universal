import defineChunkEntry from "../chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "loginForm",
    context: contexts.chunkEntries,
    load: () => import("./loginForm" /* webpackChunkName: "loginForm" */),
});
