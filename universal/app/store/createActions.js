export default function createActions(scope, actions) {
    return Object.keys(actions).reduce((wrappedActions, actionName) => {
        const executor = actions[actionName];

        wrappedActions[actionName] = (...args) => ({
            scope,
            executor,
            args,
        });

        return wrappedActions;
    }, {});
}
