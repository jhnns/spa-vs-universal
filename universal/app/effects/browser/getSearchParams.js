import URLSearchParams from "url-search-params";
import getSearchParams from "../registry/getSearchParams";
import defineEffect from "../../util/defineEffect";

export default defineEffect(getSearchParams, store => () => new URLSearchParams(window.location.search));
