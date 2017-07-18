import { render, h } from "preact";

window.h = h;

function startApp() {
    const createApp = require("../createApp").default;
    const captureFormSubmit = require("./captureFormSubmit").default;
    const captureLinkClick = require("./captureLinkClick").default;
    const captureHistoryPop = require("./captureHistoryPop").default;
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
        captureHistoryPop(store);

        const applyLazyStylesheets = require("./applyLazyStylesheets").default;

        applyLazyStylesheets();
    });
}

document.addEventListener("DOMContentLoaded", startApp);
