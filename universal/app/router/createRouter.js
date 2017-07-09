import nanorouter from "nanorouter";

export default function createRouter(routes, handleRoute) {
    const router = nanorouter({ default: "/404" });

    Object.values(routes).forEach(route => {
        router.on(route.match, urlParams => {
            handleRoute(route, urlParams);
        });
    });

    return router;
}
