import nanorouter from "nanorouter";
import { actions as routerAction } from "./state";
import routes from "../routes";

export default function createRouter(store) {
    const router = nanorouter({ default: "/404" });

    Object.keys(routes).forEach(routeName => {
        const route = routes[routeName];

        router.on(route.match, urlParams => {
            store.dispatch(routerAction.handleRouteMatch(routeName, urlParams));
        });
    });

    return router;
}
