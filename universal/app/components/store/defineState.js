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
    const hydrate = typeof descriptor.hydrate === "function" ? descriptor.hydrate : s => Object.assign({}, s);

    function selectState(globalState) {
        return ensureHydrated(has(globalState, scope) ? globalState[scope] : initialState);
    }

    function ensureHydrated(state) {
        if (state !== initialState && isDehydratable(state) === true) {
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

    const actionDescriptor = has(descriptor, "actions") ? descriptor.actions : emptyObj;
    const state = {
        actions: Object.keys(actionDescriptor).reduce((actions, actionName) => {
            const execute = actionDescriptor[actionName];
            const type = scope + "/" + actionName;

            actions[actionName] = (...args) => (dispatchAction, getState) => {
                function getScopedState() {
                    return selectState(getState());
                }

                function patchState(patch) {
                    return dispatchAction({
                        type: type + "/patch",
                        payload: {
                            ...getScopedState(),
                            ...patch,
                        },
                    });
                }

                function execEffect(effect, ...args) {
                    return dispatchAction({
                        type: type + "/effect",
                        payload: {
                            effect,
                            args,
                        },
                    });
                }

                return execute(...args)(getScopedState, patchState, dispatchAction, execEffect);
            };

            return actions;
        }, {}),
        select: selectState,
    };

    return state;
}
