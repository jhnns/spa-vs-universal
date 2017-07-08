import getSearchParams from "../registry/getSearchParams";
import defineEffect from "../../util/defineEffect";
import state from "../../router/state";

export default defineEffect(getSearchParams, store => () => state.selector(store.getState()));
