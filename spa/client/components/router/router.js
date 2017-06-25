import { Component } from "preact";
import sheetRouter from "sheet-router";
import onHistoryPop from "sheet-router/history";
import onLinkClick from "sheet-router/href";
import routes from "../../routes";
import Placeholder from "./placeholder";

const defaultParams = {};

function createRouter(routes, setState) {
    const router = sheetRouter(
        routes.map(([route, config]) => [
            route,
            params => {
                setState({ config, params });
            },
        ])
    );

    onHistoryPop(location => router(location.href));
    onLinkClick(({ href }) => {
        window.history.pushState({}, "", href);
        router(href);
    });

    return router;
}

export default class Router extends Component {
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
        const componentPromise = state.config.component();

        return (
            <Placeholder
                promise={componentPromise}
                props={state.params || defaultParams}
            />
        );
    }
}
