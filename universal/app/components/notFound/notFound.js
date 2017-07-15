import defineState from "../store/defineState";
import contexts from "../../contexts";
import defineComponent from "../util/defineComponent";
import { state as documentState } from "../document/document";

const name = "notFound";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        enter: () => (getState, patchState, dispatchAction, execEffect) => {
            dispatchAction(
                documentState.actions.update({
                    statusCode: 404,
                    title: "Not Found",
                    headerTags: [],
                })
            );
        },
    },
});

export default defineComponent({
    name,
    render() {
        return (
            <div>
                <h2>Not Found</h2>
            </div>
        );
    },
});
