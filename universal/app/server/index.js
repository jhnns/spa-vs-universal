import "../util/initPreact";
import createRenderStream from "./createRenderStream";
import { state as routeState } from "../components/router/route";
import promiseState from "../util/promiseState";
import createApp from "../createApp";

export default function handleRequest(req, res) {
    const { app, store } = createApp();

    res.header("Content-Type", "text/html");
    promiseState(store, routeState.selector, "statusCode").then(statusCode => {
        res.status(statusCode);
        createRenderStream({
            title: promiseState(store, routeState.selector, "title"),
            headerTags: promiseState(store, routeState.selector, "headerTags"),
            app: promiseState(store, routeState.selector, "finished").then(() => app),
        }).pipe(res);
    });
}
