import { h } from "preact";
import createRenderStream from "./createRenderStream";

global.h = h;

export default function handleRequest(req, res) {
    const createApp = require("../createApp").default;
    const routerState = require("../components/router/router").state;
    const documentState = require("../components/document/document").state;
    const storeState = require("../components/store/store").state;
    const { app, store } = createApp({});

    res.header("Content-Type", "text/html");

    store.dispatch(routerState.actions.init(req.url));
    store.when(s => documentState.select(s).statusCode).then(statusCode => {
        const whenNoPendingAction = store.when(
            s => storeState.select(s).pendingActions,
            pending => pending.length === 0
        );

        res.status(statusCode);
        createRenderStream({
            title: store.when(s => documentState.select(s).title),
            headerTags: store.when(s => documentState.select(s).headerTags),
            state: whenNoPendingAction.then(() => store.getState()),
            app: whenNoPendingAction.then(() => app),
        }).pipe(res);
    });
}
