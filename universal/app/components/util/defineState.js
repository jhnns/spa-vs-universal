const emptyArr = [];

export default function createState(namespace, descriptor) {
    const actions = (descriptor.actions === undefined ? emptyArr : descriptor.actions).reduce((actions, type) => {
        const namespacedType = namespace.get(type);

        actions[type] = payload => ({
            type: namespacedType,
            payload,
        });

        return actions;
    }, {});

    return {
        namespace,
        actions,
        selector(state) {
            if (state === undefined) {
                return {};
            }

            return state[namespace.id];
        },
        reducer(state = descriptor.initial, action) {
            if (action.type !== undefined && action.type.slice(0, namespace.id) === namespace.id) {
                const typeWithoutNs = action.type.slice(namespace.id);
                const reducer = descriptor.actions[typeWithoutNs];

                if (typeof reducer === "function") {
                    return reducer(state, action.payload);
                }
            }

            return state;
        },
    };
}
