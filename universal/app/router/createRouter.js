import nanorouter from "nanorouter";
import URLSearchParams from "url-search-params";

function createRouteHandler(route, component) {
    return urlParams => {
        const params = new URLSearchParams(window.location.search);

        for (const key of Object.keys(urlParams)) {
            params.set(key, urlParams[key]);
        }

        component.setState({
            previousRoute: component.state.route || null,
            previousParams: component.state.params || null,
            route,
            params,
        });
    };
}

export function createRouter(routes, component) {
    const router = nanorouter({ default: "/404" });

    Object.values(routes).forEach(route => {
        router.on(route.match, createRouteHandler(route, component));
    });

    onHistoryPop(location => {
        router(location.pathname);
    });
    onLinkClick(node => {
        const href = node.href;

        if (node.hasAttribute("data-route") === false) {
            window.location = href;

            return;
        }
        trigger(router, node.href, {
            replaceRoute: node.hasAttribute("data-replace-url") === true,
        });
    });

    return router;
}
