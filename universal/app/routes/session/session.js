import { state as routerState } from "../../components/router/router";
import has from "../../util/has";
import { state as sessionState } from "../session/session";
import { SEE_OTHER } from "../../util/statusCodes";

export function post(request, route, params) {
    return (dispatchAction, getState, execEffect) =>
        dispatchAction(sessionState.actions.create(request.body.name, request.body.password)).then(
            () => dispatchAction(routerState.actions.replace(has(params, "next") ? params.next : "/", SEE_OTHER)),
            console.error
        );
}
