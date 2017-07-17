import { h } from "preact";

global.h = h;

export default function handleRequest(req, res) {
    const createApp = require("../createApp").default;
    const renderApp = require("./renderApp").default;
    const createRenderStream = require("./createRenderStream").default;
    const routerState = require("../components/router/router").state;
    const documentState = require("../components/document/document").state;
    const storeState = require("../components/store/store").state;
    const preloadAllChunkEntries = require("./preloadAllChunkEntries").default;
    const statusCodes = require("../util/statusCodes");

    const initialState = {};
    const effectContext = { req, res };
    const { app, store } = createApp(initialState, effectContext);

    store.dispatch(storeState.actions.hydrateStates());

    const routingFinished = preloadAllChunkEntries().then(() => store.dispatch(routerState.actions.push(req)));

    store.when(s => routerState.select(s).history, history => history.length > 1).then(history => {
        res.header("Location", history[history.length - 1]);
    });
    store.when(s => documentState.select(s).statusCode).then(statusCode => {
        const history = routerState.select(store.getState()).history;
        const appRendered = routingFinished.then(() => renderApp(app, store));

        res.status(statusCode);
        res.header("Content-Type", "text/html");
        if (statusCodes.isRedirect(statusCode) || history.length > 1) {
            res.header("Location", history[history.length - 1]);
        }

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
