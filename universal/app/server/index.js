import "../util/initPreact";
import { parse } from "url";
import createRenderStream from "./createRenderStream";
import promiseState from "../util/promiseState";
import createApp from "../createApp";

export default function handleRequest(req, res) {
    const { app, store, router } = createApp({});

    res.header("Content-Type", "text/html");

    router(parse(req.url).pathname);

    console.log(store.getState());

    // promiseState(store, routeState.selector, "statusCode").then(statusCode => {
    //     res.status(statusCode);
    //     createRenderStream({
    //         title: promiseState(store, routeState.selector, "title"),
    //         headerTags: promiseState(store, routeState.selector, "headerTags"),
    //         app: promiseState(store, routeState.selector, "finished").then(() => app),
    //     }).pipe(res);
    // });
}
