import { parse } from "url";
import createRouter from "../../router/createRouter";
import routerState from "../../router/state";

export default function initRouter(store) {
    return entryUrl => {
        const parsedUrl = parse(entryUrl, true);
        const router = createRouter((routeName, urlParams) => {
            store.dispatch(routerState.actions.handleRouteMatch(routeName, urlParams, parsedUrl.query));
        });

        router(parsedUrl.pathname);
    };
}
