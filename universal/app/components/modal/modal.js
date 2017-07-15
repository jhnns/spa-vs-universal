import defineComponent from "../util/defineComponent";
import registries from "../../registries";
import defineState from "../store/defineState";
import { root, rootVisible, rootHidden, window, backdrop, backdropVisible, backdropHidden } from "./modal.css";
import GoBack from "../router/goBack";

const name = "modal";
const emptyObj = {};

export const state = defineState({
    scope: name,
    context: registries.stateContext,
    initialState: {
        component: null,
        backParams: emptyObj,
    },
    hydrate(dehydrated) {
        return {
            ...dehydrated,
            toJSON: () => undefined,
        };
    },
    actions: {
        show: (component, backParams = emptyObj) => (getState, patchState, dispatchAction) => {
            patchState({
                component,
                backParams,
            });
        },
        hide: () => (getState, patchState, dispatchAction) => {
            patchState({
                component: null,
                backParams: emptyObj,
            });
        },
    },
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
        mapToState: ({ component, backParams }, oldState) => ({
            active: component !== null,
            component: component === null ? oldState.component : component,
            backParams,
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
                <GoBack params={state.backParams} {...backdropStyles} />
                <div {...window}>
                    {state.component}
                </div>
            </div>
        );
    },
});
