import fetch from "../../effects/fetch";

export default function getTop5() {
    return fetch("/posts?limit=5&sortBy=starred").then(res => res.json()).then(res => res.items);
}
