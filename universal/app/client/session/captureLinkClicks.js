import onLinkClick from "nanohref";
import { state as routerState } from "../../components/router/router";

export default function captureLinkClicks(store) {
    onLinkClick(node => {
        const url = node.href;

        if (node.hasAttribute("data-route") === false) {
            window.location = url;

            return;
        }

        const action = routerState.actions[node.hasAttribute("data-replace-url") ? "replace" : "push"];

        store.dispatch(
            action({
                method: "get",
                url,
            })
        );
    });
}
