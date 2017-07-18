import api from "../../api";

export default function getAll(context) {
    return () => api(context)("/posts").then(res => res.json()).then(res => res.items);
}
