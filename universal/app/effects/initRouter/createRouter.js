import nanorouter from "nanorouter";
import routes from "../../routes";

export default function createRouter(handleRouteMatch) {
    const router = nanorouter({ default: "/404" });

    Object.keys(routes).forEach(routeName => {
        const route = routes[routeName];

        router.on(route.match, urlParams => handleRouteMatch(routeName, urlParams));
    });

    return router;
}
