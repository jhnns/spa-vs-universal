import navigate from "../registry/navigate";
import defineEffect from "../../util/defineEffect";

export default defineEffect(navigate, (router, href, { replaceRoute = href === window.location.href } = {}) => {
    const saveState = replaceRoute === true ? window.history.replaceState : window.history.pushState;

    saveState.call(history, {}, "", href);
    router(location.pathname);
});
