import { render } from "preact";
import "../util/initPreact";
import createApp from "../createApp";

function startApp() {
    const { app, store } = createApp({});

    render(app, document.body, document.body.firstElementChild);
}

document.addEventListener("DOMContentLoaded", startApp);
