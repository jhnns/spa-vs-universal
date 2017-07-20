import defineForm from "../form/defineForm";
import defineComponent from "../util/defineComponent";
import FormFeedback from "../formFeedback/formFeedback";
import validators from "./loginFormValidators";
import { loginSheet, loginInput, loginLabel, loginSubmit, formFeedback } from "./loginForm.css";
import has from "../../util/has";
import contexts from "../../contexts";
import routes from "../../routes";
import Form from "../form/form";

const name = "loginForm";

const state = defineForm({
    name,
    context: contexts.state,
    validators,
});

function inputFieldProperties(fieldName, validationErrors) {
    return {
        name: fieldName,
        invalid: has(validationErrors, fieldName),
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: "false",
    };
}

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
    },
    render(props, { csrfToken, validationErrors, isSubmitPending, submitError }) {
        const nameId = `${ name }-name`;
        const passwordId = `${ name }-password`;
        const actionParams = {};

        if (has(props, "next")) {
            actionParams.next = props.next;
        }

        return (
            <Form
                name={name}
                method={"POST"}
                actionRoute={routes.session}
                actionParams={actionParams}
                csrfToken={csrfToken}
                {...loginSheet}
            >
                <label htmlFor={nameId} {...loginLabel}>
                    Name
                </label>
                <input
                    id={nameId}
                    {...inputFieldProperties("name", validationErrors)}
                    type="text"
                    // Let the loginForm user decide if autoFocus is appropriate
                    autoFocus={props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
                    {...loginInput}
                />
                <FormFeedback {...formFeedback}>
                    {validationErrors.name}
                </FormFeedback>
                <label htmlFor={passwordId} {...loginLabel}>
                    Password
                </label>
                <input
                    id={passwordId}
                    {...inputFieldProperties("password", validationErrors)}
                    type="password"
                    {...loginInput}
                />
                <FormFeedback {...formFeedback}>
                    {validationErrors.password}
                    {submitError === null ? null : submitError.message}
                </FormFeedback>
                <input
                    type="submit"
                    value="Log in"
                    data-pending={isSubmitPending}
                    disabled={isSubmitPending}
                    {...loginSubmit}
                />
            </Form>
        );
    },
});
