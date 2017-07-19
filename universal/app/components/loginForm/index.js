import defineChunkEntry from "../chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "session",
    name: "form",
    context: contexts.chunkEntries,
    load: () => import("./loginForm" /* webpackChunkName: "session" */),
});
