import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "../router/router";
import has from "../../util/has";
import renderUrl from "../../util/renderUrl";

export default function defineForm(descriptor) {
    const state = defineState({
        scope: descriptor.name,
        context: descriptor.stateContext,
        initialState: {
            name: descriptor.name,
            data: Object.create(null),
            isPristine: true,
            isValid: false,
            validationErrors: Object.create(null),
            isSubmitPending: false,
            submitSuccess: false,
            submitError: false,
            submitResult: null,
        },
    });
    const Component = defineComponent({
        name: descriptor.name,
        connectToStore: {
            watch: [state.select, routerState.select],
            mapToState: (state, routerState, props) => ({
                ...state,
                actionRoute: has(props, "actionRoute") ? props.actionRoute : routerState.route,
                actionParams: has(props, "actionParams") ? props.actionParams : routerState.params,
            }),
        },
        render(props, state) {
            return (
                <form method={"POST"} action={renderUrl(state.actionRoute.url, state.actionParams)} {...props.styles}>
                    {descriptor.render(props, state)}
                </form>
            );
        },
    });

    return {
        state,
        Component,
    };
}
