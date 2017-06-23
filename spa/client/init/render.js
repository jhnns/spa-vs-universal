import React, { render as preactRender } from "preact";
import App from "../components/app/App";

// Apply global styles
import "../styles/main.css"; // eslint-disable-line import/no-unassigned-import

function render() {
    preactRender(<App />, document.getElementById("root"));
}

if (module.hot) {
    module.hot.accept("./app", render);
} else {
    render();
}
