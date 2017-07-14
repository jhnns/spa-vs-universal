import { state as documentState } from "../components/document/document";
import { state as routerState } from "../components/router/router";

export default function setupSideEffects(store) {
    store.watch(documentState.select, newDocumentState => {
        document.title = newDocumentState.title;
    });
    store.watch(routerState.select, (newRouterState, oldRouterState) => {
        console.log("Router state changed");
    });
}
