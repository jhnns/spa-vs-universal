export default function attrSelector(cssSelector) {
    return `[data-${ cssSelector }]`;
}
