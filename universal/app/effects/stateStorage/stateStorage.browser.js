const LOCAL = "local";
const SESSION = "session";

const storages = {
    [LOCAL]: localStorage,
    [SESSION]: sessionStorage,
};

export default {
    LOCAL,
    SESSION,
    writeTo(storageType, namespace, state) {
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
    readFrom(storageType, namespace) {
        const result = storages[storageType].getItem(namespace);

        return result === null ? null : JSON.parse(result);
    },
};
