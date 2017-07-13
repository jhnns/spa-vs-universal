import defineChunkEntry from "../chunks/defineChunkEntry";

export default defineChunkEntry({
    name: "allPosts",
    chunk: "posts",
    load: () => import("./allPosts" /* webpackChunkName: "posts" */),
});
