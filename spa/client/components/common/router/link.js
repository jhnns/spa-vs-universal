import { Component } from "preact";

function renderHref(route, params) {
    if (params === undefined) {
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

    return href + "?" + params.toString();
}

export default class Link extends Component {
    render(props) {
        const {
            route = this.context.route,
            params,
            children,
            replaceState = false,
            activeClass = "",
        } = props;
        const classes = [
            route === this.context.route ? activeClass : "",
            props.class,
        ];
        const isExternal = typeof props.href === "string";
        const href = isExternal === true ?
            props.href :
            renderHref(route, params);
        const preLoadComponent = route && route.component;

        return (
            <a
                {...props}
                href={href}
                class={classes.join(" ")}
                onMouseOver={preLoadComponent}
                onFocus={preLoadComponent}
                dataNoRouting={isExternal}
                dataReplaceState={replaceState}
            >
                {children}
            </a>
        );
    }
}
