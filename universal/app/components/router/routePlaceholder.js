import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";
import has from "../../util/has";

const name = "routePlaceholder";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState({ route }) {
            return {
                Placeholder: route.chunkEntry.Placeholder,
                props: route.params,
            };
        },
    },
    render(props, state) {
        if (has(state, "Placeholder")) {
            const Placeholder = state.Placeholder;

            return <Placeholder props={state.params} />;
        }

        return null;
    },
});
