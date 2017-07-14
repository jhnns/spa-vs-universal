import { render, h } from "preact";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const setupSideEffects = require("./setupSideEffects").default;
    const chunkState = require("../components/chunks/chunks").state;
    const { app, store } = createApp(window.__PRELOADED_STATE__ || {});

    setupSideEffects(store);

    store.dispatch(chunkState.actions.preload()).then(() => {
        render(app, document.body, document.body.firstElementChild);

        const applyLazyStylesheets = require("./applyLazyStylesheets").default;

        applyLazyStylesheets();
    });
}

document.addEventListener("DOMContentLoaded", startApp);
