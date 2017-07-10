import { parse } from "url";
import createRouter from "../../components/router/createRouter";
import routerState from "../../components/router/state";

export default function initRouter(store) {
    return entryUrl => {
        const parsedUrl = parse(entryUrl, true);
        const router = createRouter((routeName, urlParams) => {
            store.dispatch(routerState.actions.handleRouteMatch(routeName, urlParams, parsedUrl.query));
        });

        router(parsedUrl.pathname);
    };
}
