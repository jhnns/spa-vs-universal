import { black } from "./colors";

export const defaultColor = black();
export const regularWidth = 2;
export const strongWidth = 4;

export function regular(color = defaultColor) {
    return `${ regularWidth }px solid ${ color }`;
}

export function strong(color = defaultColor) {
    return `${ strongWidth }px solid ${ color }`;
}
