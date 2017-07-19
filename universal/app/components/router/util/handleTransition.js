import has from "../../../util/has";

export default function handleTransition(action, getState, patchState, dispatchAction) {
    return new Promise(resolve => {
        const { route } = getState();

        resolve(
            dispatchAction(action).then(componentModule => {
                const state = getState();

                if (state.route !== route) {
                    // User has already switched the route
                    return state;
                }

                const actions = componentModule.state.actions;
                let action = null;

                if (state.route === state.previousRoute) {
                    if (has(actions, "update")) {
                        action = actions.update;
                    }
                } else {
                    if (has(actions, "enter") === false) {
                        throw new Error(`Route ${ route.name } has no enter action`);
                    }
                    action = actions.enter;
                }

                return Promise.resolve(
                    action === null ? null : dispatchAction(action(state.request, state.route, state.params))
                ).then(() => {
                    const state = getState();
                    const isErrorRoute = state.route.error === true;

                    if (state.request.method !== "GET" && isErrorRoute === false) {
                        throw new Error(
                            "Router finished with non-get request. Use the replace action to forward to a get request."
                        );
                    }

                    return state;
                });
            })
        );
    });
}
