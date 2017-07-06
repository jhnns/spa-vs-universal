import { h } from "preact";
import createRenderStream from "./createRenderStream";

global.h = h;

export default function handleRequest(req, res) {
    const createApp = require("../createApp").default;
    const { app } = createApp();
    const statusCode = 200;

    res.header("Content-Type", "text/html");
    res.status(statusCode);
    createRenderStream({
        title: "Hello World",
        headerTags: Promise.resolve([]),
        app: Promise.resolve(app),
    }).pipe(res);
}
