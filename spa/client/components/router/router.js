import { Component } from "preact";
import sheetRouter from "sheet-router";
import onHistoryPop from "sheet-router/history";
import onLinkClick from "sheet-router/href";
import URLSearchParams from "url-search-params";
import routes from "../../routes";
import Placeholder from "./placeholder";

const defaultParams = {};

function transformRoutes(routes, setState) {
    return Object.keys(routes).map(routeName => {
        const route = routes[routeName];

        return [
            route.match,
            params => {
                const searchParams = new URLSearchParams(
                    window.location.search
                );

                for (const [key, value] of searchParams.entries()) {
                    params[key] = value;
                }

                setState({
                    route,
                    params,
                });
            },
        ];
    });
}

function createRouter(routes, setState) {
    const router = sheetRouter(transformRoutes(routes, setState));

    onHistoryPop(location => router(location.href));
    onLinkClick(({ href }) => {
        window.history.pushState({}, "", href);
        router(href);
    });

    return router;
}

export default class Router extends Component {
    getChildContext() {
        return { route: this.state.route || null };
    }
    componentWillMount() {
        this.router = createRouter(routes, this.setState.bind(this));
        this.router(window.location.href);
    }
    componentWillUnmount() {
        // We cannot undo the side-effects introduced by the router
        throw new Error(
            "Cannot unmount router: The router is intended to be used top-level"
        );
    }
    render(props, state) {
        const componentPromise = state.route.component();

        return (
            <Placeholder props={state.params || defaultParams}>
                {componentPromise}
            </Placeholder>
        );
    }
}
