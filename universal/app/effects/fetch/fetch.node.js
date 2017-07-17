import nodeFetch from "node-fetch";
import config from "../../../config/server";

const root = `http://${ config.hostname }:${ config.port }/api`;

export default function fetch({ fetch = nodeFetch }) {
    return (url, options) => fetch(root + url, options);
}
