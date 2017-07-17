import has from "../../util/has";
import storage from "../../effects/storage";

const emptyObj = {};
const resolved = Promise.resolve();

function returnThis() {
    return this; // eslint-disable-line no-invalid-this
}

function isDehydratable(state) {
    return typeof state.toJSON === "function";
}

function copy(state) {
    return {
        ...state,
    };
}

export default function defineState(descriptor) {
    const scope = descriptor.scope;
    const context = descriptor.context;
    const namespace = context.name + "/" + scope;
    const initialState = has(descriptor, "initialState") ? descriptor.initialState : {};
    const hydrate = has(descriptor, "hydrate") ? descriptor.hydrate : copy;
    const persist = has(descriptor, "persist") ? descriptor.persist : {};

    function selectState(contextState) {
        return has(contextState, scope) ? contextState[scope] : initialState;
    }

    function isHydrated(state) {
        return state !== initialState && typeof state.toJSON === "function";
    }

    function writeTo(storageType) {
        if (has(persist, storageType) === false) {
            // Nothing to do
            return Function.prototype;
        }

        return (dispatchAction, getState, execEffect) => {
            const dehydratedState = selectState(getState()).toJSON();
            const keysToPersist = persist[storageType];
            const stateToPersist = {};

            keysToPersist.forEach(key => (stateToPersist[key] = dehydratedState[key]));

            execEffect(storage.writeTo, storageType, namespace, stateToPersist);
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
        context,
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
                const state = selectState(getState());

                if (isHydrated(state)) {
                    return resolved;
                }

                return Promise.resolve(hydrate(state, execEffect)).then(state => {
                    if (isDehydratable(state) === false) {
                        state.toJSON = returnThis;
                    }
                    dispatchAction({
                        type: namespace + "/hydrate/put",
                        payload: state,
                    });
                });
            };
        },
        select: selectState,
        persist: {
            local: writeTo(storage.LOCAL_STORAGE),
            session: writeTo(storage.SESSION_STORAGE),
        },
    };

    context.scopes[scope] = state;

    return state;
}
