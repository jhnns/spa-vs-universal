import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import { parse } from "querystring";
import createRouter from "../../components/router/createRouter";
import { actions as routeAction } from "../../components/router/state";

export default function initRouter(store) {
    return entryUrl => {
        const router = createRouter((routeName, urlParams) => {
            store.dispatch(routeAction.handleRouteMatch(routeName, urlParams, parse(window.location.search.slice(1))));
        });

        onHistoryPop(location => {
            store.dispatch(routerAction);
            void 0;
            // router(location.pathname);
        });
        onLinkClick(node => {
            const href = node.href;

            if (node.hasAttribute("data-route") === false) {
                window.location = href;

                return;
            }

            void 0;

            // context.exec(navigate, router, node.href, {
            //     replaceRoute: node.hasAttribute("data-replace-url") === true,
            // });
        });
    };
}
