import { render, h } from "preact";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const chunkState = require("../components/chunks/chunks").state;
    const routerState = require("../components/router/router").state;
    const documentState = require("../components/document/document").state;
    const { app, store } = createApp(window.__PRELOADED_STATE__ || {});

    store.dispatch(routerState.actions.init(window.location.pathname + window.location.search + window.location.hash));
    store.dispatch(chunkState.actions.preload()).then(() => {
        render(app, document.body, document.body.firstElementChild);

        const applyLazyStylesheets = require("./applyLazyStylesheets").default;

        applyLazyStylesheets();
    });
    store.watch(documentState.select, newDocumentState => {
        document.title = newDocumentState.title;
    });
}

document.addEventListener("DOMContentLoaded", startApp);
