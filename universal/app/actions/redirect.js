import { state as routerState } from "../components/router/router";
import { state as documentState } from "../components/document/document";
import has from "../util/has";

export const REDIRECT_TYPE_SEE_OTHER = "See other";
export const REDIRECT_TYPE_TEMPORARY = "Temporary redirect";
export const REDIRECT_TYPE_PERMANENT = "Permanent redirect";
export const statusCodes = {
    [REDIRECT_TYPE_SEE_OTHER]: 303,
    [REDIRECT_TYPE_TEMPORARY]: 307,
    [REDIRECT_TYPE_PERMANENT]: 308,
};

export default function redirect(request, redirectType) {
    return (dispatchAction, getState) =>
        new Promise(resolve => {
            if (has(statusCodes, redirectType) === false) {
                throw new Error("Unknown redirect type " + redirectType);
            }
            dispatchAction(
                documentState.actions.update({
                    statusCode: statusCodes[redirectType],
                })
            );
            resolve(dispatchAction(routerState.actions.replace(request)));
        });
}
