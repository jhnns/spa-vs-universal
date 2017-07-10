import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import { parse } from "querystring";
import createRouter from "./createRouter";

export default function initRouter(entryUrl, handleRouteMatch) {
    const router = createRouter((routeName, urlParams) => {
        handleRouteMatch(routeName, urlParams, parse(window.location.search.slice(1)));
    });

    onHistoryPop(location => {
        router(location.pathname);
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
}
