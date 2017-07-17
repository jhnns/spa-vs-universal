const LOCAL_STORAGE = "local";
const SESSION_STORAGE = "session";

export default {
    LOCAL_STORAGE,
    SESSION_STORAGE,
    writeTo: ({ req }) => (storageType, state) => {},
    readFrom: ({ req }) => (storageType, state) => null,
};
