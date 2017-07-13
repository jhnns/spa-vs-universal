import defineChunkEntry from "../chunks/defineChunkEntry";

export default defineChunkEntry({
    name: "top5",
    chunk: "posts",
    load: () => import("./top5" /* webpackChunkName: "posts" */),
    placeholder: {
        default(err) {
            console.log(err);

            return <div>Loading Top5 posts</div>;
        },
    },
});
