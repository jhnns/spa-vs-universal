export function linear(dir, colorStops) {
    return `linear-gradient(${ dir }, ${ colorStops.join(", ") })`;
}

export function repeatingLinear(dir, colorStops) {
    return `repeating-linear-gradient(${ dir }, ${ colorStops.join(", ") })`;
}
