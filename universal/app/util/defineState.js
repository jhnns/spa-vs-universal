import { add as addReducer } from "../store/reducers";

export default function defineState(namespace, { actions, reducer }) {
    addReducer(namespace.id, reducer);

    return {
        actions,
        selector(state) {
            return state[namespace.id];
        },
    };
}
