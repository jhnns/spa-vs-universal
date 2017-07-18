import onLinkClick from "nanohref";
import { state as routerState } from "../components/router/router";

export default function captureLinkClick(store) {
    onLinkClick(node => {
        const url = node.href;

        if (node.hasAttribute("data-route") === false) {
            window.location = url;

            return;
        }

        store.dispatch(routerState.actions.push(url));
    });
}
