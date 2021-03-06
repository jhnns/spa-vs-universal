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
    confidential: ["password"],
    validators,
});

function inputFieldProperties(fieldName, data, validationErrors) {
    return {
        name: fieldName,
        invalid: has(validationErrors, fieldName),
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: "false",
        value: data[fieldName],
    };
}

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
    },
    render(props, { csrfToken, data, validationErrors, isSubmitPending, submitError, submitResult }) {
        const nameId = `${ name }-name`;
        const passwordId = `${ name }-password`;

        return (
            <Form
                name={name}
                method={"POST"}
                actionRoute={routes.session}
                actionParams={{ next: props.next }}
                csrfToken={csrfToken}
                {...loginSheet}
            >
                <label htmlFor={nameId} {...loginLabel}>
                    Name
                </label>
                <input
                    id={nameId}
                    {...inputFieldProperties("name", data, validationErrors)}
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
                    {...inputFieldProperties("password", data, validationErrors)}
                    type="password"
                    {...loginInput}
                />
                <FormFeedback {...formFeedback}>
                    {validationErrors.password}
                    {submitError ? submitResult : null}
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
