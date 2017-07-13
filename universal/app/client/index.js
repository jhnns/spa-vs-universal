import { render, h } from "preact";
import { state as chunkState } from "../components/chunks/chunks";
import applyLazyStylesheets from "./applyLazyStylesheets";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const { app, store } = createApp(window.__PRELOADED_STATE__ || {});

    store.dispatch(chunkState.actions.preload()).then(() => {
        render(app, document.body, document.body.firstElementChild);
        applyLazyStylesheets();
    });
}

document.addEventListener("DOMContentLoaded", startApp);
