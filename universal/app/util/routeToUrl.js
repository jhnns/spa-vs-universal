export default function routeToUrl(route, params) {
    if (params === null) {
        return route.match;
    }

    let url = route.match;

    for (const key of params.keys()) {
        const pattern = ":" + key;
        const patternIdx = url.indexOf(pattern);

        if (patternIdx > -1) {
            params.delete(key);

            url = url.slice(0, patternIdx - 1) + params.get(key) + url.slice(patternIdx + pattern.length);
        }
    }

    const paramString = params.toString();

    if (paramString === "") {
        return url;
    }

    return url + "?" + paramString;
}
