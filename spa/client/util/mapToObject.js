export default function mapToObject(map) {
    const obj = Object.create(null);

    for (const [key, value] of map.entries()) {
        obj[key] = value;
    }

    return obj;
}
