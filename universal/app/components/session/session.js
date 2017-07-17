import renderChild from "../util/renderChild";
import createSession from "../../effects/api/session/create";
import defineState from "../store/defineState";
import contexts from "../../contexts";

const name = "session";

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        user: null,
        token: null,
        xsrfToken: null,
    },
    persist: {
        local: true,
    },
    hydrate(dehydrated, localState) {
        if (localState === null) {
            return dehydrated;
        }

        return localState;
    },
    actions: {
        create: (name, password) => (getState, patchState, dispatchAction, execEffect) =>
            execEffect(createSession, name, password).then(res => {
                patchState({
                    user: res.user,
                    token: res.token,
                    xsrfToken: res.xsrfToken,
                });
                dispatchAction(state.persist.local);

                return true;
            }),
    },
});

export default renderChild;
