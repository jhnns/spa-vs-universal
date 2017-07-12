function removeFirst(map) {
    for (const [key] of map) {
        map.remove(key);

        return;
    }
}

export default function addToSizedMap(sizedMap, sizeLimit, key, value) {
    const MapClass = Object.getPrototypeOf(sizedMap).constructor;
    const newMap = new MapClass(sizedMap);

    if (newMap.size === sizeLimit) {
        removeFirst(newMap);
    }
    newMap.set(key, value);

    return newMap;
}
