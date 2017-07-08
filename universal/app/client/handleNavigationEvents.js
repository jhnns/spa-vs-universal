import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";

export default function handleNavigationEvents(store) {
    onHistoryPop(location => {
        router(location.pathname);
    });
    onLinkClick(node => {
        const href = node.href;

        if (node.hasAttribute("data-route") === false) {
            window.location = href;
        }

        // context.exec(navigate, router, node.href, {
        //     replaceRoute: node.hasAttribute("data-replace-url") === true,
        // });
    });
}
