import Placeholder from "../placeholder/placeholder";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";

const name = "routePlaceholder";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState({ route }) {
            return {
                component: route.component,
                props: route.params,
            };
        },
    },
    render(props, state) {
        return <Placeholder component={state.component} props={state.params} />;
    },
});
