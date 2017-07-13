const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function has(obj, key) {
    return hasOwnProperty.call(obj, key);
}
