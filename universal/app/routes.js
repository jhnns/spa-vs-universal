import addObjectKeys from "./util/addObjectKeys";
import top5 from "./components/top5";

export default addObjectKeys(
    {
        top5: {
            match: "/",
            load: top5,
        },
        // allPosts: {
        //     match: "/all",
        //     component: () => import("./components/allPosts/allPosts" /* webpackChunkName: "posts" */),
        // },
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
