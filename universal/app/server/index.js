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
    const has = require("../util/has").default;
    const routes = require("../routes").default;

    const initialState = {};
    const effectContext = { req, res };
    const { app, store } = createApp(initialState, effectContext);
    const firstRouterAction = has(req, "error") ?
        routerState.actions.show(routes.error, req.error, req) :
        routerState.actions.push(req);

    store.dispatch(storeState.actions.hydrateStates());

    const routingFinished = preloadAllChunkEntries().then(() => store.dispatch(firstRouterAction));

    store.when(s => documentState.select(s).statusCode).then(statusCode => {
        const history = routerState.select(store.getState()).history;
        const appRendered = routingFinished.then(() => renderApp(app, store));

        res.status(statusCode);
        res.header("Content-Type", "text/html");
        if (statusCodes.isRedirect(statusCode) || history.length > 1) {
            // It is important to use the redirect() method here or otherwise express-session
            // won't save the session on POST requests
            // https://stackoverflow.com/a/26532987
            res.redirect(history[history.length - 1]);

            return;
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
