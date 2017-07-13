import defineChunkEntry from "../chunks/defineChunkEntry";

export default defineChunkEntry({
    name: "allPosts",
    chunk: "posts",
    load: () => import("./allPosts" /* webpackChunkName: "posts" */),
    placeholder: {
        default(err) {
            console.log(err);

            return <div>Loading all posts</div>;
        },
    },
});
