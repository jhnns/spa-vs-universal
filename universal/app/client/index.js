import { render, h } from "preact";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const { app } = createApp(window.__PRELOADED_STATE__ || {});

    render(app, document.body, document.body.firstElementChild);
}

document.addEventListener("DOMContentLoaded", startApp);
