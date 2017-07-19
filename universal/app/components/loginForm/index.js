import defineChunkEntry from "../chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "session",
    name: "loginForm",
    context: contexts.chunkEntries,
    load: () => import("./loginForm" /* webpackChunkName: "session" */),
});
