import api from "../../api";

export default function getTop5(context) {
    return () => api(context)("/posts?limit=5&sortBy=starred").then(res => res.json()).then(res => res.items);
}
