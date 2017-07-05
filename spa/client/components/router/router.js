import { Component } from "preact";
import URLSearchParams from "url-search-params";
import nanorouter from "nanorouter";
import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import routes from "../../routes";
import trigger from "./util/trigger";

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

function createRouter(routes, component) {
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

export default class Router extends Component {
    constructor() {
        super();
        this.router = createRouter(routes, this);
        this.router(location.pathname);
    }
    getChildContext() {
        return {
            route: this.state.route || null,
            params: this.state.params || null,
            previousRoute: this.state.previousRoute || null,
            previousParams: this.state.previousParams || null,
            router: this.router,
        };
    }
    componentWillUnmount() {
        // We cannot undo the side-effects introduced by the router
        throw new Error("Cannot unmount router: The router is intended to be used top-level");
    }
    render(props, state) {
        return props.children[0];
    }
}
