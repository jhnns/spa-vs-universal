export default function promiseState(store, selector, property) {
    return new Promise((resolve, reject) => {
        store.subscribe(() => {
            const state = selector(store.getState());
            const result = state[property];
            const error = state[property + "Error"];

            if (result !== null) {
                resolve(result);
            } else if (error !== null) {
                reject(error);
            }
        });
    });
}
