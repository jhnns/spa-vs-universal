let reducers = {};

export function add(name, reducer) {
    reducers = {
        ...reducers,
        [name]: reducer,
    };
}

export function get() {
    return reducers;
}
