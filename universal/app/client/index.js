import { render, h } from "preact";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const captureFormSubmit = require("./session/captureFormSubmit").default;
    const captureLinkClick = require("./session/captureLinkClick").default;
    const connectToBrowserHistory = require("./session/connectToBrowserHistory").default;
    const connectToDocument = require("./session/connectToDocument").default;
    const chunkState = require("../components/chunks/chunks").state;
    const storeState = require("../components/store/store").state;

    const { app, store } = createApp(window.__PRELOADED_STATE__ || {});

    store.dispatch(storeState.actions.hydrateStates());

    captureLinkClick(store);
    captureFormSubmit(store);
    connectToBrowserHistory(store);
    connectToDocument(store);

    store.dispatch(chunkState.actions.preload()).then(() => {
        render(app, document.body, document.body.firstElementChild);

        const applyLazyStylesheets = require("./session/applyLazyStylesheets").default;

        applyLazyStylesheets();
    });
}

document.addEventListener("DOMContentLoaded", startApp);
