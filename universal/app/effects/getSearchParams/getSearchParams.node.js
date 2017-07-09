import URLSearchParams from "url-search-params";
import { getEntryUrl } from "../../router/state";

export default function getSearchParams(store) {
    return () => {
        const entryUrl = getEntryUrl(store.getState());
        const i = entryUrl.indexOf("?");

        return new URLSearchParams(i === -1 ? "" : entryUrl.slice(i));
    };
}
