import { parse } from "querystring";

export default function getSearchParams(store) {
    return () => parse(window.location.search.slice(1));
}
