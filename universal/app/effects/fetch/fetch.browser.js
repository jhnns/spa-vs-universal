import unfetch from "unfetch";

const root = "/api";

export default function fetch(url, options) {
    return unfetch(root + url, options);
}
