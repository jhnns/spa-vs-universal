import defineComponent from "../util/defineComponent";
import contexts from "../../contexts";
import defineState from "../store/defineState";
import GoBack from "../router/goBack";
import { root, rootVisible, rootHidden, window, backdrop, backdropVisible, backdropHidden } from "./modal.css";

const name = "modal";

function isCurrentlyActive(state, component) {
    const current = state.component;

    return current !== null && current === component;
}

export const state = defineState({
    scope: name,
    context: contexts.state,
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
            if (isCurrentlyActive(getState(), component) === false) {
                patchState({
                    component,
                });
            }
        },
        hide: component => (getState, patchState, dispatchAction) => {
            if (isCurrentlyActive(getState(), component) === true) {
                patchState({
                    component: null,
                });
            }
        },
    },
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
        mapToState: ({ component }, oldState) => ({
            active: component !== null,
            component,
        }),
    },
    render(props, state) {
        const rootStyles = {
            ...root,
            ...(state.active === true ? rootVisible : rootHidden),
        };
        const backdropStyles = {
            ...backdrop,
            ...(state.active === true ? backdropVisible : backdropHidden),
        };

        return (
            <div {...rootStyles}>
                <GoBack {...backdropStyles} />
                <div {...window}>
                    {state.component}
                </div>
            </div>
        );
    },
});
