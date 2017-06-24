import { render as preactRender } from "preact";
import App from "../components/app/App";

function render() {
    preactRender(<App />, document.body);
}

document.addEventListener("DOMContentLoaded", render);

if (module.hot) {
    module.hot.accept("./app", render);
}
