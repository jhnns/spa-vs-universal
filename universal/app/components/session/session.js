import renderChild from "../util/renderChild";
import createSession from "../../effects/api/session/create";
import defineState from "../store/defineState";
import contexts from "../../contexts";
import { read } from "../../effects/sessionState";

const name = "session";

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        user: null,
        token: null,
    },
    hydrate(dehydrated, execEffect) {
        const state = execEffect(read);

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

                return true;
            }),
    },
});

export default renderChild;
