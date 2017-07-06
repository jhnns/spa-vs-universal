import { h } from "preact";
import preactRender from "preact-render-to-string";

global.h = h;

export default function handleRequest(req, res) {
    const createApp = require("../createApp").default;
    const { app } = createApp();
    const statusCode = 200;

    res.header("Content-Type", "text/html");
    res.status(statusCode).end(preactRender(app));
}
