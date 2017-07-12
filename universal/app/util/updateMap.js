export default function updateMap(map, key, value) {
    const newMap = new Map(map);

    newMap.set(key, value);

    return newMap;
}
