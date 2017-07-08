import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";

export function init(router) {
    onHistoryPop(location => {
        router(location.pathname);
    });
    onLinkClick(node => {
        const href = node.href;

        if (node.hasAttribute("data-route") === false) {
            window.location = href;

            return;
        }
        trigger(router, node.href, {
            replaceRoute: node.hasAttribute("data-replace-url") === true,
        });
    });
}
