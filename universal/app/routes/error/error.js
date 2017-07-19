import { state as documentState } from "../../components/document/document";
import Component, { state } from "../../components/error/error";
import has from "../../util/has";

const emptyArr = [];

export function GET(request, route, params) {
    return (dispatchAction, getState, execEffect) => {
        const statusCode = has(params, "statusCode") ? params.statusCode : 500;
        const title = has(params, "title") ? params.title : "Error";
        const headerTags = has(params, "headerTags") ? params.headerTags : emptyArr;

        dispatchAction(
            documentState.actions.update({
                statusCode,
                title,
                headerTags,
            })
        );

        return state.actions;
    };
}

export default Component;
