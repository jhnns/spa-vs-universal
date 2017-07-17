import renderChild from "../util/renderChild";
import createSession from "../../effects/api/session/create";
import defineState from "../store/defineState";
import contexts from "../../contexts";

const name = "session";
const initialState = {
    user: null,
    token: null,
};

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState,
    persist: {
        local: true,
    },
    hydrate(dehydrated, localState) {
        if (dehydrated.user !== null && dehydrated.token !== null) {
            return dehydrated;
        }

        return localState === null ? dehydrated : localState;
    },
    actions: {
        create: (name, password) => (getState, patchState, dispatchAction, execEffect) =>
            execEffect(createSession, name, password).then(res => {
                patchState({
                    user: res.user,
                    token: res.token,
                });
                dispatchAction(state.persist.local);

                return true;
            }),
    },
});

export default renderChild;
