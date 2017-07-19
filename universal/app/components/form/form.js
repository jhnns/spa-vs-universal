import has from "../../util/has";
import filterProps from "../../util/filterProps";
import renderUrl from "../../util/renderUrl";

const ownProps = ["method", "csrfToken", "actionRoute", "actionParams"];

export default function Form(props) {
    const method = has(props, "method") ? props.method.toUpperCase() : "GET";
    const formProps = filterProps(props, ownProps);
    const csrfTokenField =
        typeof props.csrfToken === "string" && props.csrfToken.length > 0 ?
            <input type="hidden" name="_csrf" value={props.csrfToken} /> :
            null;

    // HTML forms only support GET and POST
    // The actual method is encoded as _method param
    return (
        <form
            method={method === "GET" ? "GET" : "POST"}
            action={renderUrl(props.actionRoute.url, props.actionParams)}
            {...formProps}
        >
            <input type="hidden" name="_method" value={method} />
            {csrfTokenField}
            {props.children}
        </form>
    );
}
