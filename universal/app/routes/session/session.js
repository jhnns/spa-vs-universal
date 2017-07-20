import { state as routerState } from "../../components/router/router";
import { state as sessionState } from "../../components/session/session";
import { SEE_OTHER } from "../../util/statusCodes";
import contexts from "../../contexts";
import routes from "../../routes";

export function POST(request, route, params) {
    return (dispatchAction, getState, execEffect) => {
        function abort() {
            dispatchAction(formState.actions.saveInSessionFlash());

            return dispatchAction(routerState.actions.replace(params.previous, SEE_OTHER));
        }

        const form = params.form;
        const formState = contexts.state.scopes[form];
        const formData = request.body;

        dispatchAction(formState.actions.fillOut(formData));

        const validationResult = dispatchAction(formState.actions.validate());

        if (validationResult.isValid === false) {
            return abort();
        }

        dispatchAction(formState.actions.updateSubmitResult(null));

        return dispatchAction(sessionState.actions.create(formData.name, formData.password)).then(
            result => {
                dispatchAction(formState.actions.updateSubmitResult(result));
                // No need to clear the form data, if this was a success, the session is destroyed anyway

                return dispatchAction(routerState.actions.replace(params.next, SEE_OTHER));
            },
            result => {
                dispatchAction(formState.actions.updateSubmitResult(result));

                return abort();
            }
        );
    };
}

export function DELETE(request, route, params) {
    return (dispatchAction, getState, execEffect) =>
        dispatchAction(sessionState.actions.destroy()).then(
            () => dispatchAction(routerState.actions.replace(params.next, SEE_OTHER)),
            err => dispatchAction(routerState.actions.enter(request, routes.error, err))
        );
}
