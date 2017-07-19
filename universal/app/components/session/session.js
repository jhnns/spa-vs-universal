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
            execEffect(createSession, name, password).then(res => {
                patchState({
                    user: res.user,
                    token: res.token,
                });
            }),
        destroy: () => (getState, patchState, dispatchAction, execEffect) =>
            execEffect(destroySession, getState().token).then(res => {
                patchState({
                    user: null,
                    token: null,
                });
            }),
    },
});

export default renderChild;
