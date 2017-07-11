export default function addObjectKeys(obj, propName) {
    Object.keys(obj).forEach(key => {
        obj[key][propName] = key;
    });

    return obj;
}
