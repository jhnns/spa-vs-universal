import { Component } from "preact";
import URLSearchParams from "url-search-params";
import nanorouter from "nanorouter";
import onLinkClick from "nanohref";
import onHistoryPop from "nanohistory";
import routes from "../../../routes";
import Placeholder from "../placeholder";

const defaultParams = {};

function createRouteHandler(setState, route) {
    return params => {
        const searchParams = new URLSearchParams(window.location.search);

        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }

        setState({
            route,
            params,
        });
    };
}

function createRouter(routes, setState) {
    const router = nanorouter({ default: "/404" });

    Object.values(routes).forEach(route => {
        router.on(route.match, createRouteHandler(setState, route));
    });

    onHistoryPop(location => router(location.pathname));
    onLinkClick(location => {
        window.history.pushState({}, "", location.href);
        router(location.pathname);
    });

    return router;
}

export default class Router extends Component {
    getChildContext() {
        return { route: this.state.route || null };
    }
    componentWillMount() {
        this.router = createRouter(routes, this.setState.bind(this));
        this.router(location.pathname);
    }
    componentWillUnmount() {
        // We cannot undo the side-effects introduced by the router
        throw new Error(
            "Cannot unmount router: The router is intended to be used top-level"
        );
    }
    render(props, state) {
        const params = state.params || defaultParams;

        return <Placeholder component={state.route.component} props={params} />;
    }
}
