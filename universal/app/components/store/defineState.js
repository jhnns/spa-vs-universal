const emptyObj = {};

function returnThis() {
    return this; // eslint-disable-line no-invalid-this
}

function isDehydratable(state) {
    return typeof state.toJSON === "function";
}

export default function defineState(descriptor) {
    const scope = descriptor.scope;
    const hydrate = typeof descriptor.hydrate === "function" ? descriptor.hydrate : returnThis;

    function selectState(globalState) {
        return ensureHydrated(scope in globalState ? globalState[scope] : emptyObj);
    }

    function ensureHydrated(state) {
        if (isDehydratable(state) === true) {
            return state;
        }

        const hydratedState = hydrate(state);

        if (isDehydratable(state) === false) {
            hydratedState.toJSON = returnThis;
        }

        return hydratedState;
    }

    if (typeof scope !== "string") {
        throw new Error("Missing scope");
    }

    const selectDescriptor = "select" in descriptor === true ? descriptor.select : emptyObj;
    const actionDescriptor = "actions" in descriptor === true ? descriptor.actions : emptyObj;
    const state = {
        actions: Object.keys(actionDescriptor).reduce((actions, actionName) => {
            const prepareAction = actionDescriptor[actionName];
            const type = scope + "/" + actionName;

            actions[actionName] = (...args) => ({
                type,
                scope: selectState,
                exec: prepareAction(...args),
            });

            return actions;
        }, {}),
        select: Object.keys(selectDescriptor).reduce((select, selectorName) => {
            const selector = selectDescriptor[selectorName];

            select[selectorName] = globalState => selector(selectState(globalState));

            return select;
        }, {}),
    };

    return state;
}
