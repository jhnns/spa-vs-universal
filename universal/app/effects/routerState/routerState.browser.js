import { getItem, setItem, SESSION_STORAGE } from "../storage/storage.browser";

export function read(context) {
    return () => ({
        history: getItem(context)(SESSION_STORAGE, "history"),
    });
}

export function write(context) {
    return state => {
        setItem(context)(SESSION_STORAGE, "history", state.history);
    };
}
