export default function (...bits) {
    return `calc(${ bits.join("") })`;
}
