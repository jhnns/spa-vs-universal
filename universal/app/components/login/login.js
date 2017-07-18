import defineState from "../store/defineState";
import { state as routerState } from "../router/router";
import contexts from "../../contexts";
import routes from "../../routes";
import has from "../../util/has";
import { state as sessionState } from "../session/session";
import { SEE_OTHER } from "../../util/statusCodes";

const resolved = Promise.resolve();
const name = "login";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        enter: (request, route, params) => (getState, patchState, dispatchAction, execEffect) => {
            if (request.method !== "post") {
                dispatchAction(
                    routerState.actions.enter(request, routes.error, {
                        statusCode: 405,
                        title: "Method not allowed",
                        message: "Only the post method is allowed at " + request.url,
                    })
                );

                return resolved;
            }

            return dispatchAction(sessionState.actions.create(request.body.name, request.body.password)).then(
                () => dispatchAction(routerState.actions.replace(has(params, "next") ? params.next : "/", SEE_OTHER)),
                console.error
            );
        },
    },
});
