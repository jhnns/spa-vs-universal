function defaultFilter(result) {
    return result !== null && result !== undefined;
}

export default function promiseState(store, selector, filter = defaultFilter) {
    return new Promise((resolve, reject) => {
        store.subscribe(() => {
            const result = selector(store.getState());

            if (filter(result) === true) {
                resolve(result);
            }
        });
    });
}
