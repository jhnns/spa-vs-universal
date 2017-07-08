export default class Namespace {
    constructor(id = "") {
        this.id = id;
        this.subs = new Map();
    }
    claim(id) {
        if (this.subs.has(id) === true) {
            throw new Error(`${ id } is already taken in namespace ${ this.id }`);
        }

        const sub = new Namespace(this.id + "/" + id);

        this.subs.set(id, sub);

        return sub;
    }
    get(id) {
        return this.subs.get(id);
    }
}
