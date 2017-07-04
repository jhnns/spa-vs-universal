export default function trigger(router, href, { replaceUrl = false }) {
    if (href === window.location.href) {
        return;
    }

    const saveState = replaceUrl === true ?
        window.history.replaceState :
        window.history.pushState;

    saveState.call(history, {}, "", href);
    router(location.pathname);
}
