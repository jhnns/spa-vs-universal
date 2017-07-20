export default function filterProps(allProps, blacklist) {
    const filteredProps = {};

    Object.keys(allProps)
        .filter(key => blacklist.indexOf(key) === -1)
        .forEach(key => (filteredProps[key] = allProps[key]));

    return filteredProps;
}
