import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import handleUserNavigation from "../registry/handleUserNavigation";
import defineEffect from "../../util/defineEffect";

export default defineEffect(handleUserNavigation, store => () => {
    onHistoryPop(location => {
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
});
