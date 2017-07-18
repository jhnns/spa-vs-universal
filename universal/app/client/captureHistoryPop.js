import onHistoryPop from "nanohistory";
import { state as routerState } from "../components/router/router";

export default function captureHistoryPop(store) {
    onHistoryPop(location => {
        store.dispatch(routerState.actions.enter(location.href));
    });
}
