import URLSearchParams from "url-search-params";
import { selectors as routerSelector } from "../../router/state";

export default function getSearchParams(store) {
    return () => {
        const entryUrl = routerSelector(store.getState());
        const i = entryUrl.indexOf("?");

        return new URLSearchParams(i === -1 ? "" : entryUrl.slice(i));
    };
}
