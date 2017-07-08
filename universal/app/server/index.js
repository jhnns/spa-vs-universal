import "../util/initPreact";
import createRenderStream from "./createRenderStream";
import promiseState from "../util/promiseState";
import createApp from "../createApp";
import routerState from "../router/state";

export default function handleRequest(req, res) {
    const { app, store } = createApp({});

    res.header("Content-Type", "text/html");

    store.dispatch(routerState.actions.init(req.url));

    // promiseState(store, routeState.selector, "statusCode").then(statusCode => {
    //     res.status(statusCode);
    //     createRenderStream({
    //         title: promiseState(store, routeState.selector, "title"),
    //         headerTags: promiseState(store, routeState.selector, "headerTags"),
    //         app: promiseState(store, routeState.selector, "finished").then(() => app),
    //     }).pipe(res);
    // });
}
