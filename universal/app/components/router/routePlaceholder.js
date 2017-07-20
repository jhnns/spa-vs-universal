import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";

const name = "routePlaceholder";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ request, route, params }, props, oldState) => {
            const Component = route.placeholder === undefined ? null : route.placeholder(request, route, params);

            if (Component === null) {
                return oldState;
            }

            return {
                component: <Component request={request} route={route} params={params} />,
            };
        },
    },
    render(props, state) {
        return state.component;
    },
});
