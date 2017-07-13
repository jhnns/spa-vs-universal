import unfetch from "isomorphic-unfetch";
import config from "../../../config/server";

const root = `http://${ config.hostname }:${ config.port }/api`;

export default function fetch(url, options) {
    return unfetch(root + url, options);
}
