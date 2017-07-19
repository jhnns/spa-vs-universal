import { state as documentState } from "../../components/document/document";
import Component, { state } from "../../components/allPosts/allPosts";

export function GET(request, route, params) {
    return (dispatchAction, getState, execEffect) => {
        dispatchAction(
            documentState.actions.update({
                statusCode: 200,
                title: "All Peerigon News",
                headerTags: [],
            })
        );

        return state.actions;
    };
}

export default Component;
