import defineComponent from "../util/defineComponent";
import defineState from "../../store/defineState";
import contexts from "../../contexts";

const name = "store";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        hydrateStates() {
            return (getState, patchState, dispatchAction, execEffect) => {
                Object.values(contexts.state.scopes).map(scope => dispatchAction(scope.hydrate()));
            };
        },
    },
});

export default defineComponent({
    name,
    getChildContext(props) {
        return {
            ...this,
            store: props.store,
        };
    },
});
