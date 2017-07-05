import { Component } from "preact";
import createEventHandler from "../../util/createEventHandler";
import routeToHref from "./util/routeToHref";

export default class Link extends Component {
    constructor() {
        super();

        const preloadNextComponent = this.preloadNextComponent.bind(this);

        this.handleMouseOver = createEventHandler(this, "onMouseOver", preloadNextComponent);
        this.handleFocus = createEventHandler(this, "onFocus", preloadNextComponent);
    }
    preloadNextComponent() {
        const route = this.props.route;
        const component = route && route.component;

        if (typeof component === "function") {
            component();
        }
    }
    splitProps(props) {
        const aProps = (this.aProps = {});
        const ownProps = (this.ownProps = {
            route: props.route || this.context.route,
            params: props.params || null,
            children: props.children,
            replaceRoute: Boolean(props.replaceRoute),
            activeClass: props.activeClass || "",
        });

        Object.keys(props).filter(key => key in ownProps === false).forEach(key => {
            aProps[key] = props[key];
        });
    }
    render() {
        this.splitProps(this.props);

        const { route, params, children, replaceRoute, activeClass } = this.ownProps;
        const classes = [route === this.context.route ? activeClass : "", this.aProps.class];

        return (
            <a
                {...this.aProps}
                href={routeToHref(route, params)}
                class={classes.join(" ")}
                onMouseOver={this.handleMouseOver}
                onFocus={this.handleFocus}
                data-route={true}
                data-replace-url={replaceRoute}
            >
                {children}
            </a>
        );
    }
}
