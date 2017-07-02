import { Component } from "preact";
import URLSearchParams from "url-search-params";
import nanorouter from "nanorouter";
import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import routes from "../../../routes";

function createRouteHandler(route, component) {
    return params => {
        const searchParams = new URLSearchParams(window.location.search);

        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
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
        if (node.href === window.location.href) {
            return;
        }

        const isRoute = node.hasAttribute("data-route") === true;
        const href = node.href;

        if (isRoute === false) {
            window.location = href;

            return;
        }

        const replaceUrl = node.hasAttribute("data-replace-url") === true;
        const saveState = replaceUrl === true ?
            window.history.replaceState :
            window.history.pushState;

        saveState.call(history, {}, "", href);
        router(location.pathname);
    });

    return router;
}

export default class Router extends Component {
    getChildContext() {
        return {
            route: this.state.route || null,
            params: this.state.params || null,
            previousRoute: this.state.previousRoute || null,
            previousParams: this.state.previousParams || null,
        };
    }
    componentWillMount() {
        this.router = createRouter(routes, this);
        this.router(location.pathname);
    }
    componentWillUnmount() {
        // We cannot undo the side-effects introduced by the router
        throw new Error(
            "Cannot unmount router: The router is intended to be used top-level"
        );
    }
    render(props, state) {
        return props.children[0];
    }
}
