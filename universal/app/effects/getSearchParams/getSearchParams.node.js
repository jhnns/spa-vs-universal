import { parse } from "url";
import { getEntryUrl } from "../../router/state";

export default function getSearchParams(store) {
    return () => parse(getEntryUrl(store.getState()), true).query;
}
