import sanitizeRequest from "./sanitizeRequest";
import resolveRouteAndParams from "./resolveRouteAndParams";
import routes from "../../../routes";
import methodNotAllowed from "../errors/methodNotAllowed";
import has from "../../../util/has";

function getNewState(request, optionalRoute, optionalParams) {
    const sanitizedRequest = request.sanitized ? request : sanitizeRequest(request);
    const resolvedRouteAndParams =
        optionalRoute && optionalParams ? null : resolveRouteAndParams(sanitizedRequest.parsedUrl);
    const route = optionalRoute ? optionalRoute : resolvedRouteAndParams.route;
    const params = optionalParams ? optionalParams : resolvedRouteAndParams.params;

    return {
        request: sanitizedRequest,
        route,
        params,
    };
}

export default function enterRoute(request, optionalRoute, optionalParams) {
    return (getState, patchState, dispatchAction) =>
        new Promise((resolve, reject) => {
            const stateBeforeTransitionStart = getState();
            const stateAtTransitionStart = getNewState(request, optionalRoute, optionalParams);

            function ifStillSameRequest(then) {
                return getState().request === stateAtTransitionStart.request ? then() : void resolve();
            }

            patchState(stateAtTransitionStart);
            dispatchAction(stateAtTransitionStart.route.entry).then(chunkEntryModule =>
                ifStillSameRequest(() => {
                    const { request, route, params } = getState();
                    const methodAction = chunkEntryModule[request.method];

                    if (methodAction === undefined) {
                        const allowedMethods = Object.keys(chunkEntryModule);
                        const pathname = getState().request.parsedUrl.pathname;

                        return enterRoute(request, routes.error, methodNotAllowed(allowedMethods, pathname))(
                            getState,
                            patchState,
                            dispatchAction
                        ).then(resolve, reject);
                    }

                    return Promise.resolve(dispatchAction(methodAction(request, route, params)))
                        .then(getActions => {
                            const { request, route, params } = getState();

                            if (request.method !== "GET") {
                                const isErrorRoute = route.error === true;

                                if (request.method !== "GET" && isErrorRoute === false) {
                                    throw new Error(
                                        "Router finished with non-GET request. Use the replace action to forward to a get request."
                                    );
                                }

                                return void resolve();
                            }

                            return ifStillSameRequest(() => {
                                let action;

                                if (route === stateBeforeTransitionStart.route) {
                                    action = has(getActions, "update") ? getActions.update : getActions.enter;
                                } else {
                                    action = getActions.enter;
                                }
                                if (action === undefined) {
                                    throw new Error(`Route ${ route.name } has no enter action`);
                                }

                                return dispatchAction(action(request, route, params));
                            });
                        })
                        .then(resolve, reject);
                })
            );
        });
}
