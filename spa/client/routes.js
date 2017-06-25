function extractDefault(p) {
    return p.then((e) => e.default);
}

export default [
    ["/", {
        component: () => extractDefault(import("./components/home/home")),
    }],
    ["/about", {
        component: () => extractDefault(import("./components/about/about")),
    }],
    ["/404", {
        component: () => extractDefault(import("./components/notFound/notFound")),
    }],
];
