import { render } from "preact";
import "../util/initPreact";
import createApp from "../createApp";
import handleUserNavigation from "./handleUserNavigation";

function startApp() {
    const { app, store } = createApp({});

    handleUserNavigation();

    render(app, document.body, document.body.firstElementChild);
}

document.addEventListener("DOMContentLoaded", startApp);
