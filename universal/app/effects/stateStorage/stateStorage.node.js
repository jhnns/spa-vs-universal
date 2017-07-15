const LOCAL = "local";
const SESSION = "session";

export default {
    LOCAL,
    SESSION,
    writeTo(storageType, namespace, state) {},
    readFrom(storageType, namespace) {
        return null;
    },
};
