import defineComponent from "../util/defineComponent";
import contexts from "../../contexts";
import defineState from "../store/defineState";
import { selectPreviousUrl } from "../router/router";
import { root, rootVisible, rootHidden, window, backdrop, backdropVisible, backdropHidden } from "./modal.css";
import Link from "../router/link";

const name = "modal";

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
        watch: [state.select, selectPreviousUrl],
        mapToState: ({ component }, previousUrl, oldState) => ({
            active: component !== null,
            component: component === null ? oldState.component : component,
            previousUrl,
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
                <Link href={state.previousUrl} {...backdropStyles} />
                <div {...window}>
                    {state.component}
                </div>
            </div>
        );
    },
});
