import "../util/initPreact";
import createRenderStream from "./createRenderStream";
import createApp from "../createApp";
import { state as routerState } from "../components/router/router";
import { state as documentState } from "../components/document/document";
import { state as storeState } from "../components/store/store";

export default function handleRequest(req, res) {
    const { app, store } = createApp({});

    res.header("Content-Type", "text/html");

    store.dispatch(routerState.actions.init(req.url));
    store.when(documentState.select.statusCode).then(statusCode => {
        const whenNoPendingAction = store.when(storeState.select.pendingActions, pending => pending.length === 0);

        res.status(statusCode);
        createRenderStream({
            title: store.when(documentState.select.title),
            headerTags: store.when(documentState.select.headerTags),
            state: whenNoPendingAction.then(() => store.getState()),
            app: whenNoPendingAction.then(() => app),
        }).pipe(res);
    });
}
