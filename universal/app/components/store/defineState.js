import has from "../../util/has";

const emptyObj = {};

function returnThis() {
    return this; // eslint-disable-line no-invalid-this
}

function isDehydratable(state) {
    return typeof state.toJSON === "function";
}

export default function defineState(descriptor) {
    const scope = descriptor.scope;
    const initialState = has(descriptor, "initialState") ? descriptor.initialState : {};
    const hydrate = typeof descriptor.hydrate === "function" ? descriptor.hydrate : s => s;

    function selectState(globalState) {
        return ensureHydrated(scope in globalState ? globalState[scope] : Object.assign({}, initialState));
    }

    function ensureHydrated(state) {
        if (isDehydratable(state) === true) {
            return state;
        }

        const hydratedState = hydrate(state);

        if (isDehydratable(hydratedState) === false) {
            hydratedState.toJSON = returnThis;
        }

        return hydratedState;
    }

    if (typeof scope !== "string") {
        throw new Error("Missing scope");
    }

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
        select: selectState,
    };

    return state;
}
