import URLSearchParams from "url-search-params";

export default function getSearchParams(store) {
    return () => new URLSearchParams(window.location.search);
}
