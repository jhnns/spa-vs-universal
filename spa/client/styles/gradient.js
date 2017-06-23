export function linear(dir, colorStops) {
    return `linear-gradient(${ dir }, ${ colorStops.join(", ") })`;
}
