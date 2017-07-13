import addObjectKeys from "./util/addObjectKeys";
import top5 from "./components/top5";
import allPosts from "./components/allPosts";

export default addObjectKeys(
    {
        top5: {
            match: "/",
            chunkEntry: top5,
        },
        allPosts: {
            match: "/all",
            chunkEntry: allPosts,
        },
        // about: {
        //     match: "/about",
        //     component: () => import("./components/about/about" /* webpackChunkName: "about" */),
        // },
        // notFound: {
        //     match: "/404",
        //     component: () => import("./components/notFound/notFound" /* webpackChunkName: "notFound" */),
        // },
    },
    "name"
);
