import defineChunkEntry from "../chunks/defineChunkEntry";

export default defineChunkEntry({
    chunk: "notFound",
    load: () => import("./notFound" /* webpackChunkName: "notFound" */),
});
