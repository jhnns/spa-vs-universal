import { Component } from "preact";
import URLSearchParams from "url-search-params";

function renderHref(route, params) {
    const path = route.match;

    if (params === undefined) {
        return path;
    }

    const paramKeys = Object.keys(params);
    const pathHref = paramKeys.reduce((pathHref, paramKey, i) => {
        const paramPattern = ":" + paramKey;
        const paramPatternIndex = pathHref.indexOf(paramPattern);

        if (paramPatternIndex > -1) {
            paramKeys.splice(i, 1);

            return (
                pathHref.slice(0, paramPatternIndex - 1) +
                params[paramKey] +
                pathHref.slice(paramPatternIndex + paramPattern.length)
            );
        }

        return pathHref;
    }, path);

    if (paramKeys.length === 0) {
        return pathHref;
    }

    return (
        pathHref +
        "?" +
        paramKeys.reduce((query, paramKey) => {
            query.append(paramKey, params[paramKey]);

            return query;
        }, new URLSearchParams())
    );
}

export default class Link extends Component {
    render({ route, params, className, children, activeClass = "" }) {
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
