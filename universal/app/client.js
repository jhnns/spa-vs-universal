/* eslint-env browser */

import { h, render as preactRender } from "preact";

window.h = h;

function render() {
    const createApp = require("./createApp");
    const { app } = createApp();

    preactRender(app, document.body);
}

document.addEventListener("DOMContentLoaded", render);
