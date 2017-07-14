import hookIntoEvent from "../util/hookIntoEvent";
import routeToUrl from "../../util/routeToUrl";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";
import has from "../../util/has";

const emptyObj = {};

function preloadNextComponent(route) {
    const component = route !== undefined && route.component;

    if (typeof component === "function") {
        component();
    }
}

function splitProps(props, state) {
    const own = {
        route: props.route || state.route,
        params: props.params || null,
        children: props.children,
        replaceRoute: Boolean(props.replaceRoute),
        activeClass: props.activeClass || "",
    };

    props.a = Object.keys(props).filter(key => has(own, key) === false).reduce((a, key) => {
        a[key] = props[key];

        return a;
    }, {});
    props.own = own;
}

export default defineComponent({
    name: "Link",
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ route, url }) => ({
            url,
            route,
        }),
    },
    handlers: {
        handleMouseOver: hookIntoEvent("onMouseOver", (dispatchAction, event, props) => {
            preloadNextComponent(props.own.route);
        }),
        handleFocus: hookIntoEvent("onFocus", (dispatchAction, event, props) => {
            preloadNextComponent(props.own.route);
        }),
    },
    render(props, state) {
        splitProps(props, state);

        const { route, params, children, replaceRoute, activeClass } = props.own;
        const targetUrl = ""; // routeToUrl(route, params);

        return (
            <a
                {...props.a}
                {...(route === state.route ? activeClass : emptyObj)}
                href={targetUrl}
                onMouseOver={this.handlers.handleMouseOver}
                onFocus={this.handlers.handleFocus}
                data-route={true}
                data-replace-url={replaceRoute}
            >
                {children}
            </a>
        );
    },
});
