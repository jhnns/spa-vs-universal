export default function forward(router, href, { replaceRoute = href === window.location.href } = {}) {
    const saveState = replaceRoute === true ? window.history.replaceState : window.history.pushState;

    saveState.call(history, {}, "", href);
    router(location.pathname);
}
