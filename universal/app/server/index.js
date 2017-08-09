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
    const has = require("../util/has").default;
    const routes = require("../routes").default;

    const initialState = {};
    const effectContext = { req, res };
    const { app, store } = createApp(initialState, effectContext);
    const firstRouterAction = has(req, "error") ?
        routerState.actions.enter(req, routes.error, req.error) :
        routerState.actions.enter(req);

    res.header("Content-Type", "text/html");

    store.dispatch(storeState.actions.hydrateStates());

    const routingFinished = preloadAllChunkEntries().then(() => store.dispatch(firstRouterAction));

    store.when(s => documentState.select(s).statusCode).then(statusCode => {
        const appRendered = routingFinished.then(() => renderApp(app, store));

        res.statusCode = statusCode;
        createRenderStream({
            title: store.when(s => documentState.select(s).title),
            headerTags: store.when(s => documentState.select(s).headerTags),
            html: appRendered.then(({ html }) => html),
            state: appRendered.then(({ state }) => state),
            chunks: appRendered.then(({ chunks }) => chunks),
        }).pipe(res);
    });
}
