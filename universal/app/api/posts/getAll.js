import fetch from "../../effects/fetch";

export default function getAll() {
    return fetch("/posts").then(res => res.json()).then(res => res.items);
}
