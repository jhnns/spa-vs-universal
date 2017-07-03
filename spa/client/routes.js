import useDefault from "./util/useDefault";

export default {
    top5: {
        match: "/",
        component: () => useDefault(import("./components/top5/top5" /* webpackChunkName: "posts" */)),
    },
    allPosts: {
        match: "/all",
        component: () => useDefault(import("./components/allPosts/allPosts" /* webpackChunkName: "posts" */)),
    },
    about: {
        match: "/about",
        component: () => useDefault(import("./components/about/about" /* webpackChunkName: "about" */)),
    },
    notFound: {
        match: "/404",
        component: () => useDefault(import("./components/notFound/notFound" /* webpackChunkName: "notFound" */)),
    },
};
