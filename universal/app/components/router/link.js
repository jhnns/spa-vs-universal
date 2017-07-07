import perviousEventHandler from "../util/perviousEventHandler";
import routeToHref from "../../util/routeToHref";
import defineComponent from "../util/defineComponent";

function preloadNextComponent(route) {
    const component = route && route.component;

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

export default defineComponent("Link " + module.id, {
    handlers: {
        handleMouseOver: perviousEventHandler("onMouseOver", (e, self) => {
            preloadNextComponent(self.props.own.route);
        }),
        handleFocus: perviousEventHandler("onFocus", (e, self) => {
            preloadNextComponent(self.props.own.route);
        }),
    },
    render(self) {
        splitProps(self.props);

        const { route, params, children, replaceRoute, activeClass } = self.props.own;
        const classes = [route === self.context.route ? activeClass : "", self.props.a.class];

        return (
            <a
                {...self.props.a}
                href={routeToHref(route, params)}
                class={classes.join(" ")}
                onMouseOver={self.handlers.handleMouseOver}
                onFocus={self.handlers.handleFocus}
                data-route={true}
                data-replace-url={replaceRoute}
            >
                {children}
            </a>
        );
    },
});
