import addObjectKeys from "./util/addObjectKeys";

export default addObjectKeys(
    {
        top5: {
            match: "/",
            component: () => import("./components/top5/top5" /* webpackChunkName: "posts" */),
        },
        allPosts: {
            match: "/all",
            component: () => import("./components/allPosts/allPosts" /* webpackChunkName: "posts" */),
        },
        about: {
            match: "/about",
            component: () => import("./components/about/about" /* webpackChunkName: "about" */),
        },
        notFound: {
            match: "/404",
            component: () => import("./components/notFound/notFound" /* webpackChunkName: "notFound" */),
        },
    },
    "name"
);
