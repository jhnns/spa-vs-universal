import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import contexts from "../../contexts";
import { state as documentState } from "../document/document";
import { errorSheet, headline, text } from "./error.css";
import has from "../../util/has";

const name = "error";
const emptyArr = [];
const defaultNextUrl = "/";

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        title: null,
        message: null,
    },
    actions: {
        enter: (request, route, params) => (getState, patchState, dispatchAction) => {
            const statusCode = has(params, "statusCode") ? params.statusCode : 500;
            const title = has(params, "title") ? params.title : "Error";
            const message = has(params, "message") ? params.message : "An unexpected error occurred";
            const headerTags = has(params, "headerTags") ? params.headerTags : emptyArr;

            dispatchAction(
                documentState.actions.update({
                    statusCode,
                    title,
                    headerTags,
                })
            );
            patchState({
                title,
                message,
            });
        },
    },
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
        mapToState: s => s,
    },
    render(props, state) {
        return (
            <div>
                <div {...errorSheet}>
                    <h2 {...headline}>
                        {state.title}
                    </h2>
                    <div {...text}>
                        <p>
                            {state.message}
                        </p>
                    </div>
                </div>
            </div>
        );
    },
});
