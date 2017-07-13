function removeFirst(map) {
    for (const [key] of map) {
        map.remove(key);

        return;
    }
}

export default function addToSizedMap(sizedMap, sizeLimit, key, value) {
    if (sizedMap.size === sizeLimit) {
        removeFirst(sizedMap);
    }
    sizedMap.set(key, value);

    return sizedMap;
}
