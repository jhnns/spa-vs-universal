import defineChunkEntry from "../chunks/defineChunkEntry";
import contexts from "../../contexts";

export default defineChunkEntry({
    chunk: "login",
    name: "form",
    context: contexts.chunkEntries,
    load: () => import("./loginForm" /* webpackChunkName: "login" */),
});
