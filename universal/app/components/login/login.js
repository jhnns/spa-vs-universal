import defineState from "../store/defineState";
import { state as documentState } from "../document/document";
import { state as routerState } from "../router/router";
import contexts from "../../contexts";

const name = "login";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        enter: (request, route, params) => (getState, patchState, dispatchAction) => {
            if (request.method !== "post") {
                dispatchAction(
                    documentState.actions.update({
                        statusCode: 405,
                        title: "Method not allowed",
                    })
                );
                dispatchAction(routerState.actions.show());

                return;
            }
            console.log("entered login");
        },
    },
});
