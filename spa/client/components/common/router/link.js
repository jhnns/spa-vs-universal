import { Component } from "preact";
import URLSearchParams from "url-search-params";

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
    render({
        route = this.context.route,
        params,
        className,
        children,
        activeClass = "",
    }) {
        const classNames = [
            route === this.context.route ? activeClass : "",
            className,
        ];
        const isExternal = typeof route === "string";
        const href = isExternal === true ? route : renderHref(route, params);

        return (
            <a
                href={href}
                className={classNames.join(" ")}
                data-no-routing={typeof route === "string"}
            >
                {children}
            </a>
        );
    }
}
