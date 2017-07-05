/* eslint-env node */

import { h } from "preact";
import preactRender from "preact-render-to-string";

global.h = h;

module.exports = function handleRequest(req, res) {
    const createApp = require("./createApp");
    const { app } = createApp();
    const statusCode = 200;

    res.status(statusCode).end(preactRender(app));
};
