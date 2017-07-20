import renderChild from "../util/renderChild";
import createSession from "../../effects/api/session/create";
import destroySession from "../../effects/api/session/destroy";
import defineState from "../store/defineState";
import contexts from "../../contexts";
import session from "../../effects/session";

const name = "session";

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        user: null,
        token: null,
        formStates: Object.create(null),
    },
    hydrate(dehydrated, execEffect) {
        const state = execEffect(session.read);

        return {
            ...dehydrated,
            ...state,
        };
    },
    actions: {
        create: (name, password) => (getState, patchState, dispatchAction, execEffect) =>
            // No need to write the session because the API is doing that for us
            execEffect(createSession, name, password).then(res => {
                patchState({
                    user: res.user,
                    token: res.token,
                });
            }),
        destroy: () => (getState, patchState, dispatchAction, execEffect) =>
            // No need to write the session because the API is doing that for us
            execEffect(destroySession, getState().token).then(res => {
                patchState({
                    user: null,
                    token: null,
                });
            }),
        rememberFormState: (formName, state) => (getState, patchState, dispatchAction, execEffect) => {
            const formStates = Object.create(null);
            const patch = {
                formStates,
            };

            Object.assign(formStates, getState().formStates);
            formStates[formName] = state;

            patchState(patch);
            execEffect(session.write, patch);
        },
        discardFormState: formName => (getState, patchState, dispatchAction, execEffect) => {
            const formStates = Object.create(null);
            const patch = {
                formStates,
            };

            Object.assign(formStates, getState().formStates);
            delete formStates[formName];

            patchState(patch);
            execEffect(session.write, patch);
        },
    },
});

export default renderChild;
