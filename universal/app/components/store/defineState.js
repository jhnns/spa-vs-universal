import has from "../../util/has";
import storage from "../../effects/storage";

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
    const persist = has(descriptor, "persist") ? descriptor.persist : emptyObj;
    const localPersist = has(persist, "local") ? persist.local : false;
    const sessionPersist = has(persist, "session") ? persist.session : false;

    function selectState(contextState) {
        return has(contextState, scope) ? contextState[scope] : initialState;
    }

    function isHydrated(state) {
        return hydrate === undefined || (state !== initialState && typeof state.toJSON === "function");
    }

    function writeTo(storageType) {
        if (has(persist, storageType) === false) {
            // Nothing to do
            return Function.prototype;
        }

        const keys = persist[storageType];

        return (dispatchAction, getState, execEffect) => {
            const dehydratedState = selectState(getState()).toJSON();
            const keysToPersist = keys === true ? Object.keys(dehydratedState) : keys;
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
                const dehydrated = selectState(getState());

                if (isHydrated(dehydrated)) {
                    return;
                }

                const localState = localPersist ? execEffect(storage.readFrom, storage.LOCAL_STORAGE, namespace) : null;
                const sessionState = sessionPersist ?
                    execEffect(storage.readFrom, storage.SESSION_STORAGE, namespace) :
                    null;
                const hydrated = hydrate(dehydrated, localState, sessionState);

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
        persist: {
            local: writeTo(storage.LOCAL_STORAGE),
            session: writeTo(storage.SESSION_STORAGE),
        },
    };

    context.scopes[scope] = state;

    return state;
}
