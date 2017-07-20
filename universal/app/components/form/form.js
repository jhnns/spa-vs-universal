import has from "../../util/has";
import filterProps from "../../util/filterProps";
import renderUrl from "../../util/renderUrl";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "../router/router";

const name = "form";
const ownProps = ["method", "csrfToken", "actionRoute", "actionParams"];
const filterDangerousParams = ["next", "previous", "form"];
const emptyObj = {};

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ request }) => ({
            currentUrl: request.url,
        }),
    },
    render(props, state) {
        const { actionParams = emptyObj } = props;
        const method = has(props, "method") ? props.method.toUpperCase() : "GET";
        const formProps = filterProps(props, ownProps);
        const isNonGET = method !== "GET";
        // Do not extend the action params with pervious and next parameters
        // when it's a GET request because these requests can be crafted by an attacker.
        // All the other requests require a valid csrf token. As soon as the request
        // hits our route handler, we can expect it to be safe.
        const extendedActionParams = isNonGET ?
            {
                ...actionParams,
                previous: has(actionParams, "previous") ? actionParams.previous : state.currentUrl,
                next: has(actionParams, "next") ? actionParams.next : state.currentUrl,
                form: has(props, "name") ? props.name : null,
            } :
            filterProps(actionParams, filterDangerousParams);

        // HTML forms only support GET and POST
        // The actual method is encoded as _method param
        return (
            <form
                method={isNonGET ? "POST" : "GET"}
                action={renderUrl(props.actionRoute.url, extendedActionParams)}
                {...formProps}
            >
                <input type="hidden" name="_method" value={method} />
                {has(props, "csrfToken") ? <input type="hidden" name="_csrf" value={props.csrfToken} /> : null}
                {props.children}
            </form>
        );
    },
});
