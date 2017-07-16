import { state as routerState } from "../../components/router/router";

export default function captureLinkClicks(store) {
    document.addEventListener("submit", event => {
        const formNode = event.target;

        store.dispatch(
            routerState.actions.push({
                method: formNode.method,
                url: formNode.action,
            })
        );
    });
}
