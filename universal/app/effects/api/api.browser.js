import fetch from "unfetch";

const root = "/api";

export default function api() {
    return (url, options) => fetch(root + url, options);
}
