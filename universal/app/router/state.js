import defineState from "../store/defineState";
import initRouter from "../effects/initRouter";
import routes from "../routes";

export default defineState({
    scope: "router",
    initialState: {
        entryUrl: "",
        routeName: null,
        params: null,
        previousRouteName: null,
        previousParams: null,
    },
    actions: {
        init: entryUrl => (getState, updateState, dispatchAction, execEffect) => {
            updateState({
                entryUrl,
            });
            execEffect(initRouter, entryUrl);
        },
        handleRouteMatch: (routeName, urlParams, searchParams) => (
            getState,
            updateState,
            dispatchAction,
            execEffect
        ) => {
            Object.assign(searchParams, urlParams);

            const params = searchParams;
            const state = getState();
            const newState = {
                routeName,
                params,
                previousRouteName: state.routeName,
                previousParams: state.params,
            };

            updateState(newState);
        },
    },
    select: {
        entryUrl(state) {
            return state.entryUrl;
        },
        currentLocation(state) {
            const routeName = state.routeName;

            return {
                route: routeName === null ? null : routes[routeName],
                params: state.params,
            };
        },
        previousLocation(state) {
            const routeName = state.previousRouteName;

            return {
                route: routeName === null ? null : routes[routeName],
                params: state.previousParams,
            };
        },
    },
});
