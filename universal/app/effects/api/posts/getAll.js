import fetch from "../../fetch";

export default function getAll(context) {
    return () => fetch(context)("/posts").then(res => res.json()).then(res => res.items);
}
