import hookIntoEvent from "../util/hookIntoEvent";
import routeToHref from "../../util/routeToHref";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";

const emptyObj = {};

function preloadNextComponent(route) {
    const component = route !== undefined && route.component;

    if (typeof component === "function") {
        component();
    }
}

function splitProps(props, context) {
    const own = {
        route: props.route || context.route,
        params: props.params || null,
        children: props.children,
        replaceRoute: Boolean(props.replaceRoute),
        activeClass: props.activeClass || "",
    };

    props.a = Object.keys(props).filter(key => key in own === false).reduce((a, key) => {
        a[key] = props[key];

        return a;
    }, {});
    props.own = own;
}

export default defineComponent({
    name: "Link",
    connectToStore: {
        watch: [routerState.select],
        map(props, state, { route }) {
            return {
                route,
            };
        },
    },
    handlers: {
        handleMouseOver: hookIntoEvent("onMouseOver", (dispatchAction, event, props) => {
            preloadNextComponent(props.own.route);
        }),
        handleFocus: hookIntoEvent("onFocus", (dispatchAction, event, props) => {
            preloadNextComponent(props.own.route);
        }),
    },
    render(props) {
        splitProps(props);

        const { route, params, children, replaceRoute, activeClass } = props.own;

        return (
            <a
                {...props.a}
                {...(route === this.state.route ? activeClass : emptyObj)}
                href={routeToHref(route, params)}
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
