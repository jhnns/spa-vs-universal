import fetch from "unfetch";
import config from "../config";

export default function getAll() {
    return fetch(`${ config.root }/posts`)
        .then(res => res.json())
        .then(res => res.items);
}
