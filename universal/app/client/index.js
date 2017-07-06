import { h, render } from "preact";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const { app } = createApp();

    render(app, document.body);
}

document.addEventListener("DOMContentLoaded", startApp);
