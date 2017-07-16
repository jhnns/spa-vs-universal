import { h } from "preact";
import createRenderStream from "./createRenderStream";

global.h = h;

export default function handleRequest(req, res) {
    const createApp = require("../createApp").default;
    const routerState = require("../components/router/router").state;
    const documentState = require("../components/document/document").state;
    const renderApp = require("./renderApp").default;
    const preloadAllChunks = require("./preloadAllChunks").default;
    const { app, store } = createApp({});

    res.header("Content-Type", "text/html");

    const routingFinished = preloadAllChunks().then(() => store.dispatch(routerState.actions.push(req)));

    store.when(s => documentState.select(s).statusCode).then(statusCode => {
        const appRendered = routingFinished.then(() => renderApp(app, store));

        res.status(statusCode);
        createRenderStream({
            title: store.when(s => documentState.select(s).title),
            headerTags: store.when(s => documentState.select(s).headerTags),
            html: appRendered.then(({ html }) => html),
            css: appRendered.then(({ css }) => css),
            state: appRendered.then(({ state }) => state),
            chunks: appRendered.then(({ chunks }) => chunks),
        }).pipe(res);
    });
}
