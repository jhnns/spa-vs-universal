export default function trigger(router, href, { replaceRoute = false }) {
    if (href === window.location.href) {
        return;
    }

    const saveState = replaceRoute === true ?
        window.history.replaceState :
        window.history.pushState;

    saveState.call(history, {}, "", href);
    router(location.pathname);
}
