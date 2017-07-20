import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";

const name = "routePlaceholder";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
    },
    render(props, state) {
        const { request, route, params } = state;
        const Component = route.placeholder(request, route, params);

        return <Component request={request} route={route} params={params} />;
    },
});
