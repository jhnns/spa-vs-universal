import { getRouter } from "../initRouter/initRouter.browser";

export default function forward(href, { replaceRoute = href === window.location.href } = {}) {
    const saveState = replaceRoute === true ? window.history.replaceState : window.history.pushState;

    saveState.call(history, {}, "", href);
    getRouter()(location.pathname);
}
