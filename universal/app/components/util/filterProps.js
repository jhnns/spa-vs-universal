export default function filterProps(allProps, filterList) {
    const filteredProps = {};

    Object.keys(allProps)
        .filter(key => filterList.indexOf(key) === -1)
        .forEach(key => (filteredProps[key] = allProps[key]));

    return filteredProps;
}
