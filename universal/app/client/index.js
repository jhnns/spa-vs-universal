import { render } from "preact";
import "../util/initPreact";

function startApp() {
    const createApp = require("../createApp").default;
    const { app } = createApp();

    render(app, document.body, document.body.firstElementChild);
}

document.addEventListener("DOMContentLoaded", startApp);
