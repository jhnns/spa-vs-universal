import defineChunkEntry from "../chunks/defineChunkEntry";

export default defineChunkEntry({
    name: "top5",
    chunk: "posts",
    load: () => import("./top5" /* webpackChunkName: "posts" */),
});
