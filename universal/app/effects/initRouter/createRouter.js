import nanorouter from "nanorouter";
import routes from "../../routes";

export default function createRouter(handleRouteMatch) {
    const router = nanorouter({ default: "/404" });

    Object.values(routes).forEach(route => {
        router.on(route.match, urlParams => handleRouteMatch(route, urlParams));
    });

    return router;
}
