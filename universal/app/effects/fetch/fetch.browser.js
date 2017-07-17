import unfetch from "unfetch";

const root = "/api";

export default function fetch({ fetch = unfetch }) {
    return (url, options) => fetch(root + url, options);
}
