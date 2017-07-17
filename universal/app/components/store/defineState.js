import has from "../../util/has";
import stateStorage from "../../effects/stateStorage";

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
    const initialState = has(descriptor, "initialState") ? descriptor.initialState : {};
    const hydrate = typeof descriptor.hydrate === "function" ? descriptor.hydrate : s => ({ ...s });
    const persist = has(descriptor, "persist") ? descriptor.persist : {};

    function selectState(contextState) {
        return has(contextState, scope) ? contextState[scope] : initialState;
    }

    function isHydrated(state) {
        return state !== initialState && isDehydratable(state) === true;
    }

    function getHydrated(state) {
        const localState = stateStorage.readFrom(stateStorage.LOCAL, namespace);
        const sessionState = stateStorage.readFrom(stateStorage.SESSION, namespace);
        const hydratedState = hydrate(state, localState, sessionState);

        if (isDehydratable(hydratedState) === false) {
            hydratedState.toJSON = returnThis;
        }

        return hydratedState;
    }

    function writeTo(storageType) {
        if (has(persist, storageType) === false) {
            // Nothing to do
            return Function.prototype;
        }

        return state => {
            const stateToPersist = {
                toJSON: state.toJSON,
            };
            const keys = persist[storageType];

            keys.forEach(key => (stateToPersist[key] = state[key]));
            stateStorage.writeTo(storageType, namespace, stateToPersist);
        };
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
        persist: {
            local: writeTo(stateStorage.LOCAL),
            session: writeTo(stateStorage.SESSION),
        },
        hydrate() {
            return (dispatchAction, getState) => {
                const state = selectState(getState());

                if (isHydrated(state) === false) {
                    dispatchAction({
                        type: namespace + "/hydrate/put",
                        payload: getHydrated(state),
                    });
                }
            };
        },
        select: selectState,
    };

    context.scopes[scope] = state;

    return state;
}
