import { state as documentState } from "../../components/document/document";
import Component, { state } from "../../components/top5/top5";

export function GET(request, route, params) {
    return (dispatchAction, getState, execEffect) => {
        dispatchAction(
            documentState.actions.update({
                statusCode: 200,
                title: "Top 5 Peerigon News",
                headerTags: [],
            })
        );

        return state.actions;
    };
}

export default Component;
