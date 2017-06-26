import fetch from "unfetch";
import config from "../config";

function fetchAndParse() {
    return fetch(`${ config.root }/posts`).then(res => res.json());
}

export default function getAll() {
    return fetchAndParse().then(res => res.items);
}
