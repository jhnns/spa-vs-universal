export default function routeToHref(route, params) {
    if (params === null) {
        return route.match;
    }

    let href = route.match;

    for (const key of params.keys()) {
        const pattern = ":" + key;
        const patternIdx = href.indexOf(pattern);

        if (patternIdx > -1) {
            params.delete(key);

            href = href.slice(0, patternIdx - 1) + params.get(key) + href.slice(patternIdx + pattern.length);
        }
    }

    const paramString = params.toString();

    if (paramString === "") {
        return href;
    }

    return href + "?" + paramString;
}
