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

        try {
            storage.setItem(namespace, JSON.stringify(state));
        } catch (err) {
            // If something goes wrong here, the quota has probably exceeded
            console.error(err);
            try {
                storage.clear();
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
