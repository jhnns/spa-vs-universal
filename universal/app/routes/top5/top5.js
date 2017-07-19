import { state as documentState } from "../../components/document/document";
import Component, { state, title } from "../../components/top5/top5";

export function get(request, route, params) {
    return (dispatchAction, getState, execEffect) => {
        dispatchAction(
            documentState.actions.update({
                statusCode: 200,
                title,
                headerTags: [],
            })
        );

        return state.actions;
    };
}

export default Component;
