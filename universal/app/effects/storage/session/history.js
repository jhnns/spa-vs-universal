import { getItem, setItem, SESSION_STORAGE } from "../../storage";

export function read(context) {
    return () => getItem(context)(SESSION_STORAGE, "history");
}

export function write(context) {
    return history => {
        setItem(context)(SESSION_STORAGE, "history", history);
    };
}
