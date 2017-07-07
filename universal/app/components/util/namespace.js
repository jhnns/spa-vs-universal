export default class Namespace {
    constructor(id) {
        this.id = id;
        this.subs = new Map();
    }
    get(id) {
        if (this.subs.has(id) === true) {
            return this.subs.get(id);
        }

        const sub = new Namespace(this.id + "/" + id);

        this.subs.set(id, sub);

        return sub;
    }
}
