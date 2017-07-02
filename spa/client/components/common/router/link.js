import { Component } from "preact";
import createEventHandler from "../../../util/createEventHandler";

function routeToHref(route, params) {
    if (params === null) {
        return route.match;
    }

    let href = route.match;

    for (const key of params.keys()) {
        const pattern = ":" + key;
        const patternIdx = href.indexOf(pattern);

        if (patternIdx > -1) {
            params.delete(key);

            href =
                href.slice(0, patternIdx - 1) +
                params.get(key) +
                href.slice(patternIdx + pattern.length);
        }
    }

    const paramString = params.toString();

    if (paramString === "") {
        return href;
    }

    return href + "?" + paramString;
}

export default class Link extends Component {
    constructor() {
        super();

        const preloadNextComponent = this.preloadNextComponent.bind(this);

        this.handleMouseOver = createEventHandler(
            this,
            "onMouseOver",
            preloadNextComponent
        );
        this.handleFocus = createEventHandler(
            this,
            "onFocus",
            preloadNextComponent
        );
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
            replaceUrl: Boolean(props.replaceUrl),
            activeClass: props.activeClass || "",
        });

        Object.keys(props)
            .filter(key => key in ownProps === false)
            .forEach(key => {
                aProps[key] = props[key];
            });
    }
    render() {
        this.splitProps(this.props);

        const {
            route,
            params,
            children,
            replaceUrl,
            activeClass,
        } = this.ownProps;
        const classes = [
            route === this.context.route ? activeClass : "",
            this.aProps.class,
        ];

        return (
            <a
                {...this.aProps}
                href={routeToHref(route, params)}
                class={classes.join(" ")}
                onMouseOver={this.handleMouseOver}
                onFocus={this.handleFocus}
                data-route={true}
                data-replace-url={replaceUrl}
            >
                {children}
            </a>
        );
    }
}
