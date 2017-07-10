import "../util/initPreact";
import createRenderStream from "./createRenderStream";
import promiseState from "../util/promiseState";
import createApp from "../createApp";
import { state as routerState } from "../components/router/router";
import { state as documentState } from "../components/document/document";

export default function handleRequest(req, res) {
    const { app, store } = createApp({});

    res.header("Content-Type", "text/html");

    store.dispatch(routerState.actions.init(req.url));

    promiseState(store, documentState.select.statusCode).then(statusCode => {
        res.status(statusCode);
        createRenderStream({
            title: promiseState(store, documentState.select.title),
            headerTags: promiseState(store, documentState.select.headerTags),
            app,
        }).pipe(res);
    });
}
