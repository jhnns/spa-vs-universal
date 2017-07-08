import { add as addReducer } from "../store/reducers";

const emptyArr = [];

export default function defineState(namespace, descriptor) {
    const actions = (descriptor.actions === undefined ? emptyArr : descriptor.actions).reduce((actions, type) => {
        const namespacedType = namespace.get(type);

        actions[type] = payload => ({
            type: namespacedType,
            payload,
        });

        return actions;
    }, {});

    function reducer(state = descriptor.initial, action) {
        if (action.type !== undefined && action.type.slice(0, namespace.id) === namespace.id) {
            const typeWithoutNs = action.type.slice(namespace.id);
            const reducer = descriptor.actions[typeWithoutNs];

            if (typeof reducer === "function") {
                return reducer(state, action.payload);
            }
        }

        return state;
    }

    addReducer(namespace.id, reducer);

    return {
        namespace,
        actions,
        reducer,
        selector(state) {
            if (state === undefined) {
                return {};
            }

            return state[namespace.id];
        },
    };
}
