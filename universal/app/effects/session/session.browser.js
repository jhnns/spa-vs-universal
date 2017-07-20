function returnNull() {
    return null;
}

export default {
    read: () => returnNull,
    write: () => Function.prototype,
    readFlash: () => returnNull,
    writeFlash: () => Function.prototype,
};
