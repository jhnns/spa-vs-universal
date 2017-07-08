import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import handleUserNavigation from "../registry/handleUserNavigation";
import navigate from "../registry/navigate";
import defineEffect from "../../util/defineEffect";

export default defineEffect(handleUserNavigation, (context, router) => {
    onHistoryPop(location => {
        router(location.pathname);
    });
    onLinkClick(node => {
        const href = node.href;

        if (node.hasAttribute("data-route") === false) {
            window.location = href;

            return;
        }

        context.exec(navigate, router, node.href, {
            replaceRoute: node.hasAttribute("data-replace-url") === true,
        });
    });
});
