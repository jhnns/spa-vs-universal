import nodeFetch from "node-fetch";
import config from "../../../config/server";

const root = `http://${ config.hostname }:${ config.port }/api`;

export default function fetch(url, options) {
    return nodeFetch(root + url, options);
}
