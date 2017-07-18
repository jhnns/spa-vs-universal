import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "../router/router";
import has from "../../util/has";
import renderUrl from "../../util/renderUrl";
import csrf from "../../effects/csrf";

export default function defineForm(descriptor) {
    const state = defineState({
        scope: descriptor.name,
        context: descriptor.stateContext,
        initialState: {
            name: descriptor.name,
            data: Object.create(null),
            csrfToken: null,
            isPristine: true,
            isValid: false,
            validationErrors: Object.create(null),
            isSubmitPending: false,
            submitSuccess: false,
            submitError: false,
            submitResult: null,
        },
        hydrate(dehydrated, execEffect) {
            return {
                ...dehydrated,
                csrfToken: execEffect(csrf),
            };
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
            const method = has(props, "method") ? props.method.toLowerCase() : "get";

            // HTML forms only support GET and POST
            // The actual method is encoded as _method param
            return (
                <form
                    method={method === "get" ? "GET" : "POST"}
                    action={renderUrl(state.actionRoute.url, state.actionParams)}
                    {...props.styles}
                >
                    <input type="hidden" name="_method" value={method} />
                    <input type="hidden" name="_csrf" value={state.csrfToken} />
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
