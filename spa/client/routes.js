function useDefault(p) {
    return p.then(e => e.default);
}

export default {
    home: {
        match: "/",
        component: () => useDefault(import("./components/home/home" /* webpackChunkName: "home" */)),
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
