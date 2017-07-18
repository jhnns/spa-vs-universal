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
    const context = descriptor.context;
    const namespace = context.name + "/" + scope;
    const initialState = has(descriptor, "initialState") ? descriptor.initialState : emptyObj;
    const hydrate = descriptor.hydrate;

    function selectState(contextState) {
        return has(contextState, scope) ? contextState[scope] : initialState;
    }

    function isHydrated(state) {
        return hydrate === undefined || (state !== initialState && typeof state.toJSON === "function");
    }

    if (typeof scope !== "string") {
        throw new Error("Scope is missing");
    }
    if (context === undefined) {
        throw new Error("State context is missing");
    }
    if (has(context.scopes, scope)) {
        throw new Error(`Scope ${ scope } is already defined on given state context`);
    }

    const actionDescriptor = has(descriptor, "actions") ? descriptor.actions : emptyObj;
    const state = {
        context,
        namespace,
        scope,
        actions: Object.keys(actionDescriptor).reduce((actions, actionName) => {
            const execute = actionDescriptor[actionName];
            const type = namespace + "/" + actionName;

            actions[actionName] = (...args) => (dispatchAction, getState, execEffect) => {
                function getScopedState() {
                    return selectState(getState());
                }

                function patchState(patch) {
                    return dispatchAction({
                        type: type + "/patch",
                        payload: patch,
                    });
                }

                return execute(...args)(getScopedState, patchState, dispatchAction, execEffect);
            };

            return actions;
        }, {}),
        hydrate() {
            return (dispatchAction, getState, execEffect) => {
                const dehydrated = selectState(getState());

                if (isHydrated(dehydrated)) {
                    return;
                }

                const hydrated = hydrate(dehydrated, execEffect);

                if (isDehydratable(hydrated) === false) {
                    hydrated.toJSON = returnThis;
                }

                dispatchAction({
                    type: namespace + "/hydrate/put",
                    payload: hydrated,
                });
            };
        },
        select: selectState,
    };

    context.scopes[scope] = state;

    return state;
}
