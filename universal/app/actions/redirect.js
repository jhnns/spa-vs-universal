import { state as routerState } from "../components/router/router";
import { state as documentState } from "../components/document/document";

export default function redirect(request, statusCode) {
    return (dispatchAction, getState) =>
        new Promise(resolve => {
            // We dispatch the routerState replace action first because as soon as the statusCode is present
            // the headers will be flushed.
            const routingFinished = dispatchAction(routerState.actions.replace(request));

            dispatchAction(
                documentState.actions.update({
                    statusCode,
                })
            );

            resolve(routingFinished);
        });
}
