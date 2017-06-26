function useDefault(p) {
    return p.then(e => e.default);
}

export default {
    top5: {
        match: "/",
        component: () => useDefault(import("./components/posts/posts" /* webpackChunkName: "posts" */)),
        params: {
            sortBy: "rating",
            limit: 5,
        },
    },
    allPosts: {
        match: "/all",
        component: () => useDefault(import("./components/posts/posts" /* webpackChunkName: "posts" */)),
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
