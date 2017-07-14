import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import URLSearchParams from "url-search-params";
import createRouter from "./createRouter";
import mergeParams from "./mergeParams";
import forward from "../forward/forward.browser";

export default function initRouter(entryUrl, handleRouteMatch) {
    return new Promise(resolve => {
        const router = createRouter((route, urlParams) => {
            const searchParams = new URLSearchParams(window.location.search.slice(1));

            resolve(handleRouteMatch(route, mergeParams(urlParams, searchParams)));
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

            forward(router, node.href, {
                replaceRoute: node.hasAttribute("data-replace-url") ? true : undefined,
            });
        });
    });
}
