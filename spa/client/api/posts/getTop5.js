import fetch from "unfetch";
import config from "../config";

export default function getTop5() {
    return fetch(`${ config.root }/posts?limit=5&sortBy=starred`)
        .then(res => res.json())
        .then(res => res.items);
}
