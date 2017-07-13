import defineChunkEntry from "../chunks/defineChunkEntry";

export default defineChunkEntry({
    chunk: "about",
    load: () => import("./about" /* webpackChunkName: "about" */),
});
