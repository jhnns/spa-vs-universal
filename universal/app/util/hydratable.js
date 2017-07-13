function toJSON() {
    const self = this; // eslint-disable-line no-invalid-this
    const arr = new Array(self.size);
    const i = 0;

    for (const entry of self.entries()) {
        arr[i] = entry;
    }

    return arr;
}

export class HydratableMap extends Map {}
HydratableMap.prototype.toJSON = toJSON;

export class HydratableSet extends Set {}
HydratableSet.prototype.toJSON = toJSON;
