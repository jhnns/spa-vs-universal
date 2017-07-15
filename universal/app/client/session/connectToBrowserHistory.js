import onHistoryPop from "nanohistory";
import { state as routerState } from "../../components/router/router";

export default function connectToBrowserHistory(store) {
    let duringPopState = false;

    function synchronizeHistory(newHistory, oldHistory) {
        const lengthDiff = newHistory.length - oldHistory.length;

        if (lengthDiff === 0) {
            history.replaceState(null, "", newHistory[newHistory.length - 1]);
        } else if (lengthDiff > 0) {
            for (let i = 0; i < lengthDiff; i++) {
                history.pushState(null, "", newHistory[oldHistory.length + i]);
            }
        } else if (lengthDiff < 0) {
            for (let i = 0; i < Math.abs(lengthDiff); i++) {
                history.back();
            }
        }
    }

    store.watch(routerState.select, (newRouterState, oldRouterState) => {
        if (duringPopState === false) {
            synchronizeHistory(newRouterState.history, oldRouterState.history);
        }
    });
    onHistoryPop(location => {
        duringPopState = true;
        store.dispatch(routerState.actions.pop(location.href));
        duringPopState = false;
    });
}
