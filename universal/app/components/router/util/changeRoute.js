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
            const enterResolvedRoute = execEffect(historyEffect, sanitizedReq.url, statusCode);

            resolve(
                enterResolvedRoute ?
                    enterRoute(sanitizedReq, route, params)(getState, patchState, dispatchAction) :
                    null
            );
        });
}
