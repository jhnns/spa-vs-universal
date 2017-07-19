import sanitizeRequest from "./sanitizeRequest";
import resolveRouteAndParams from "./resolveRouteAndParams";
import enterRoute from "./enterRoute";

export default function changeRoute({ abortIf, historyEffect }) {
    return (request, statusCode) => (getState, patchState, dispatchAction, execEffect) =>
        new Promise(resolve => {
            const oldState = getState();
            const sanitizedReq = sanitizeRequest(request);

            if (abortIf(oldState, sanitizedReq)) {
                resolve(oldState);

                return;
            }

            const { route, params } = resolveRouteAndParams(sanitizedReq.parsedUrl);

            execEffect(historyEffect, sanitizedReq.url, statusCode);
            resolve(enterRoute(sanitizedReq, route, params)(getState, patchState, dispatchAction));
        });
}
