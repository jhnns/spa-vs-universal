export default function updateMap(map, key, value) {
    const MapClass = Object.getPrototypeOf(map).constructor;
    const newMap = new MapClass(map);

    newMap.set(key, value);

    return newMap;
}
