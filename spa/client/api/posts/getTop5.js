import fetch from "unfetch";
import config from "../config";

function fetchAndParse() {
    return fetch(`${ config.root }/posts?limit=5&sortBy=starred`).then(res =>
        res.json()
    );
}

export default function getTop5() {
    return fetchAndParse().then(res => res.items);
}
