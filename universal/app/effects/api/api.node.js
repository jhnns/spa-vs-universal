import fetch from "node-fetch";
import config from "../../../config/server";

const root = `http://${ config.hostname }:${ config.port }/api`;

export default function api() {
    return (url, options) => fetch(root + url, options);
}
