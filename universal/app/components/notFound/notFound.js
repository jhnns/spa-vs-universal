import defineState from "../store/defineState";
import renderChild from "../util/renderChild";
import contexts from "../../contexts";
import { state as routerState } from "../router/router";
import routes from "../../routes";

const name = "notFound";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        enter: request => (getState, patchState, dispatchAction, execEffect) => {
            dispatchAction(
                routerState.actions.enter(request, routes.error, {
                    statusCode: 404,
                    title: "Not Found",
                    message: "The requested route does not exist",
                })
            );
        },
    },
});

export default renderChild;
