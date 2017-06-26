function extractDefault(p) {
    return p.then((e) => e.default);
}

export default [
    ["/", {
        name: "home",
        component: () => extractDefault(import("./components/home/home" /* webpackChunkName: "home" */)),
    }],
    ["/about", {
        name: "about",
        component: () => extractDefault(import("./components/about/about" /* webpackChunkName: "about" */)),
    }],
    ["/not-found", {
        name: "notFound",
        component: () => extractDefault(import("./components/notFound/notFound" /* webpackChunkName: "notFound" */)),
    }],
];
