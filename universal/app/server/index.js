import { h } from "preact";
import createRenderStream from "./createRenderStream";

global.h = h;

export default function handleRequest(req, res) {
    const createApp = require("../createApp").default;
    const routerState = require("../components/router/router").state;
    const documentState = require("../components/document/document").state;
    const storeState = require("../components/store/store").state;
    const selectLoadedChunks = require("../components/chunks/chunks").selectLoadedChunks;
    const { app, store } = createApp({});

    res.header("Content-Type", "text/html");

    store.dispatch(routerState.actions.init(req.url));
    store.when(s => documentState.select(s).statusCode).then(statusCode => {
        const finalState = store
            .when(s => storeState.select(s).pendingActions, pending => pending.length === 0)
            .then(s => store.getState());

        res.status(statusCode);
        createRenderStream({
            title: store.when(s => documentState.select(s).title),
            headerTags: store.when(s => documentState.select(s).headerTags),
            loadedChunks: finalState.then(selectLoadedChunks),
            state: finalState,
            app: finalState.then(() => app),
        }).pipe(res);
    });
}
