import fetch from "../../fetch";

export default function getTop5(context) {
    return () => fetch(context)("/posts?limit=5&sortBy=starred").then(res => res.json()).then(res => res.items);
}
