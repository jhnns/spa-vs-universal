import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import contexts from "../../contexts";
import { errorSheet, headline, text } from "./error.css";
import has from "../../util/has";

const name = "error";

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        headline: null,
        message: null,
    },
    actions: {
        enter: (request, route, params) => (getState, patchState, dispatchAction) => {
            const headline = has(params, "title") ? params.title : "Error";
            const message = has(params, "message") ? params.message : "An unexpected error occurred";

            patchState({
                headline,
                message,
            });
        },
    },
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
    },
    render(props, state) {
        return (
            <div>
                <div {...errorSheet}>
                    <h2 {...headline}>
                        {state.headline}
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
