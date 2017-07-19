import url from "url";

export default function parseUrl(u) {
    return url.parse(u, true);
}
