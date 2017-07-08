export default function defineState(namespace, { actions, initialState }) {
    const id = namespace.id;
    const wrappedActions = Object.keys(actions).reduce((wrappedActions, actionName) => {
        const executor = actions[actionName];

        wrappedActions[actionName] = (...args) => ({
            scope: id,
            executor,
            args,
        });

        return wrappedActions;
    }, {});

    return {
        actions: wrappedActions,
        selector(state) {
            return state[id];
        },
    };
}
