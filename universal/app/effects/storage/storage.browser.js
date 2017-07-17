const LOCAL_STORAGE = "local";
const SESSION_STORAGE = "session";

const defaultStorages = {
    [LOCAL_STORAGE]: localStorage,
    [SESSION_STORAGE]: sessionStorage,
};

export default {
    LOCAL_STORAGE,
    SESSION_STORAGE,
    writeTo: ({ storages = defaultStorages }) => (storageType, namespace, state) => {
        const storage = storages[storageType];
        const stringifiedState = JSON.stringify(state);

        try {
            storage.setItem(namespace, stringifiedState);
        } catch (err) {
            // If something goes wrong here, the quota has probably exceeded
            console.error(err);
            console.log("Retrying storage setItem after clearing it");
            try {
                storage.clear();
                storage.setItem(namespace, stringifiedState);
            } catch (err) {
                console.error(err);
            }
        }
    },
    readFrom: ({ storages = defaultStorages }) => (storageType, namespace) => {
        const result = storages[storageType].getItem(namespace);

        return result === null ? null : JSON.parse(result);
    },
};
