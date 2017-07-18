export const LOCAL_STORAGE = "local";
export const SESSION_STORAGE = "session";

const defaultStorages = {
    [LOCAL_STORAGE]: localStorage,
    [SESSION_STORAGE]: sessionStorage,
};

export function setItem({ storages = defaultStorages }) {
    return (storageType, key, state) => {
        const storage = storages[storageType];
        const stringifiedState = JSON.stringify(state);

        try {
            storage.setItem(key, stringifiedState);
        } catch (err) {
            // If something goes wrong here, the quota has probably exceeded
            console.error(err);
            console.log("Retrying storage setItem after clearing it");
            try {
                storage.clear();
                storage.setItem(key, stringifiedState);
            } catch (err) {
                console.error(err);
            }
        }
    };
}
export function getItem({ storages = defaultStorages }) {
    return (storageType, key) => {
        const storage = storages[storageType];
        const result = storage.getItem(key);

        return result === null ? null : JSON.parse(result);
    };
}
