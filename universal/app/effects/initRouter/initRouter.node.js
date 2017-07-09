import { parse } from "url";
import createRouter from "../../router/createRouter";
import { actions as routeAction } from "../../router/state";

export default function initRouter(store) {
    return entryUrl => {
        const parsedUrl = parse(entryUrl, true);
        const router = createRouter((routeName, urlParams) => {
            store.dispatch(routeAction.handleRouteMatch(routeName, urlParams, parsedUrl.query));
        });

        router(parsedUrl.pathname);
    };
}
