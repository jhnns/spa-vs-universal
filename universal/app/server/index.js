import { h } from "preact";
import createRenderStream from "./createRenderStream";

global.h = h;

export default function handleRequest(req, res) {
    const createApp = require("../createApp").default;
    const routerState = require("../components/router/router").state;
    const documentState = require("../components/document/document").state;
    const storeState = require("../components/store/store").state;
    const renderApp = require("./renderApp").default;
    const preloadAllChunks = require("./preloadAllChunks").default;

    const initialState = {};
    const effectContext = { req, res };
    const { app, store } = createApp(initialState, effectContext);

    store.dispatch(storeState.actions.hydrateStates());

    const routingFinished = preloadAllChunks().then(() => store.dispatch(routerState.actions.push(req)));

    store.when(s => documentState.select(s).statusCode).then(statusCode => {
        const appRendered = routingFinished.then(() => renderApp(app, store));

        res.status(statusCode);
        res.header("Content-Type", "text/html");

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
