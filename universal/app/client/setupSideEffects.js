import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import { state as documentState } from "../components/document/document";
import { state as routerState } from "../components/router/router";

export default function setupSideEffects(store) {
    let duringPopState = false;

    function synchronizeHistory(newHistory, oldHistory) {
        const lengthDiff = newHistory.length - oldHistory.length;

        if (lengthDiff === 0) {
            history.replaceState(null, "", newHistory[newHistory.length - 1]);
        } else if (lengthDiff > 0) {
            for (let i = 0; i < lengthDiff; i++) {
                history.pushState(null, "", newHistory[oldHistory.length + i]);
            }
        } else if (lengthDiff < 0 && duringPopState === false) {
            for (let i = 0; i < Math.abs(lengthDiff); i++) {
                history.back();
            }
        }
    }

    store.watch(documentState.select, newDocumentState => {
        document.title = newDocumentState.title;
    });
    store.watch(routerState.select, (newRouterState, oldRouterState) => {
        synchronizeHistory(newRouterState.history, oldRouterState.history);
    });
    onHistoryPop(location => {
        duringPopState = true;
        store.dispatch(routerState.actions.pop());
        duringPopState = false;
    });
    onLinkClick(node => {
        const url = node.href;

        if (node.hasAttribute("data-route") === false) {
            window.location = url;

            return;
        }

        const action = routerState.actions[node.hasAttribute("data-replace-url") ? "replace" : "push"];

        store.dispatch(action(url));
    });
}