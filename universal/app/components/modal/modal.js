import defineComponent from "../util/defineComponent";
import defineState from "../store/defineState";
import { root, window, backdrop, backdropVisible, backdropHidden } from "./modal.css";

const name = "modal";

export const state = defineState({
    scope: name,
    initialState: {
        component: null,
    },
    hydrate(dehydrated) {
        return {
            ...dehydrated,
            toJSON: () => undefined,
        };
    },
    actions: {
        show: component => (getState, patchState, dispatchAction) => {
            patchState({
                component,
            });
        },
        hide: () => (getState, patchState, dispatchAction) => {
            patchState({
                component: null,
            });
        },
    },
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
        mapToState: ({ component }, oldState) => ({
            active: component !== null,
            component: component === null ? oldState.component : component,
        }),
    },
    render(props, state) {
        const backdropStyles = {
            ...backdrop,
            ...(state.active === true ? backdropVisible : backdropHidden),
        };

        return (
            <div {...root}>
                <a href="" {...backdropStyles}>
                    Go back
                </a>
                <div {...window}>
                    {state.component}
                </div>
            </div>
        );
    },
});
