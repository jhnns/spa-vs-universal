import { state as routerState } from "../../components/router/router";
import Component from "../../components/error/error";
import routes from "../../routes";

export function GET(request, route, params) {
    return (dispatchAction, getState, execEffect) => {
        dispatchAction(
            routerState.actions.enter(request, routes.error, {
                statusCode: 404,
                title: "Not Found",
                message: "The requested route does not exist",
            })
        );
    };
}

export default Component;
