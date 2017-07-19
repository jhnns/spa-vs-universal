import renderChild from "../util/renderChild";
import createSession from "../../effects/api/session/create";
import destroySession from "../../effects/api/session/destroy";
import { state as routerState } from "../router/router";
import defineState from "../store/defineState";
import contexts from "../../contexts";
import session from "../../effects/session";
import routes from "../../routes";
import has from "../../util/has";
import { SEE_OTHER } from "../../util/statusCodes";

const name = "session";
const allowedMethods = ["post", "delete"];
const resolved = Promise.resolve();

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
        enter: (request, route, params) => (getState, patchState, dispatchAction, execEffect) => {
            if (allowedMethods.indexOf(request.method) === -1) {
                dispatchAction(
                    routerState.actions.enter(request, routes.error, {
                        statusCode: 405,
                        title: "Method not allowed",
                        message: `Only ${ allowedMethods.join(", ") } is allowed at ${ request.url }`,
                    })
                );

                return resolved;
            }

            const action =
                request.method === "post" ?
                    state.actions.create(request.body.name, request.body.password) :
                    state.actions.destroy();

            return dispatchAction(action).then(
                () => dispatchAction(routerState.actions.replace(has(params, "next") ? params.next : "/", SEE_OTHER)),
                console.error
            );
        },
        create: (name, password) => (getState, patchState, dispatchAction, execEffect) =>
            execEffect(createSession, name, password).then(res => {
                patchState({
                    user: res.user,
                    token: res.token,
                });
            }),
        destroy: () => (getState, patchState, dispatchAction, execEffect) =>
            execEffect(destroySession).then(res => {
                patchState({
                    user: null,
                    token: null,
                });
            }),
    },
});

export default renderChild;
