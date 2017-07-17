import defineState from "../store/defineState";
import { state as routerState } from "../router/router";
import contexts from "../../contexts";
import routes from "../../routes";
import createSession from "../../api/session/create";
import has from "../../util/has";
import redirect, { REDIRECT_TYPE_SEE_OTHER } from "../../actions/redirect";

const resolved = Promise.resolve();
const name = "login";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        enter: (request, route, params) => (getState, patchState, dispatchAction, execEffect) => {
            if (request.method !== "post") {
                dispatchAction(
                    routerState.actions.show(routes.error, {
                        statusCode: 405,
                        title: "Method not allowed",
                        message: "Only the post method is allowed at " + request.url,
                    })
                );

                return resolved;
            }

            return createSession(request.body).then(
                () => dispatchAction(redirect(has(params, "next") ? params.next : "/", REDIRECT_TYPE_SEE_OTHER)),
                console.error
            );
        },
    },
});
