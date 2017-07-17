import has from "../../util/has";

const LOCAL_STORAGE = "local";
const SESSION_STORAGE = "session";

export default {
    LOCAL_STORAGE,
    SESSION_STORAGE,
    writeTo: ({ req }) => (storageType, namespace, state) => {
        if (storageType === SESSION_STORAGE) {
            // There is no coherent browsing session on the server
            // Do nothing in this case
            return;
        }

        req.session[namespace] = state;
    },
    readFrom: ({ req }) => (storageType, namespace) => {
        if (storageType === SESSION_STORAGE) {
            // There is no coherent browsing session on the server
            // so we can't read anything
            return null;
        }

        return has(req.session, namespace) ? req.session[namespace] : null;
    },
};
