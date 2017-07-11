export default function mergeParams(urlParams, searchParams) {
    Object.keys(urlParams).forEach(paramName => {
        searchParams.set(paramName, urlParams[paramName]);
    });

    return searchParams;
}
