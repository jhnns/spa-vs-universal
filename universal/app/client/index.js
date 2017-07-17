import { render, h } from "preact";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const captureFormSubmit = require("./session/captureFormSubmit").default;
    const captureLinkClick = require("./session/captureLinkClick").default;
    const connectToBrowserHistory = require("./session/connectToBrowserHistory").default;
    const connectToDocument = require("./session/connectToDocument").default;
    const preloadChunkEntries = require("./preloadChunkEntries").default;
    const chunkState = require("../components/chunks/chunks").state;
    const storeState = require("../components/store/store").state;

    const initialState = window.__PRELOADED_STATE__ || {};
    const effectContext = {};
    const { app, store } = createApp(initialState, effectContext);

    store.dispatch(storeState.actions.hydrateStates());

    preloadChunkEntries(chunkState.select(store.getState()).loadedEntries).then(() => {
        render(app, document.body, document.body.firstElementChild);

        captureLinkClick(store);
        captureFormSubmit(store);
        connectToBrowserHistory(store);
        connectToDocument(store);

        const applyLazyStylesheets = require("./session/applyLazyStylesheets").default;

        applyLazyStylesheets();
    });
}

document.addEventListener("DOMContentLoaded", startApp);
