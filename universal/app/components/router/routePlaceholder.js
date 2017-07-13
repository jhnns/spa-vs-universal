import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";

const name = "routePlaceholder";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState({ route }) {
            return {
                Placeholder: route.Placeholder,
                props: route.params,
            };
        },
    },
    render(props, state) {
        if (typeof state.Placeholder === "function") {
            const Placeholder = state.Placeholder;

            return <Placeholder props={state.params} />;
        }

        return null;
    },
});
