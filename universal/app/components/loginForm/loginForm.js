import defineForm from "../form/defineForm";
import FormFeedback from "../formFeedback/formFeedback";
import validators from "./loginFormValidators";
import { loginSheet, loginInput, loginLabel, loginSubmit, formFeedback } from "./loginForm.css";
import has from "../../util/has";
import contexts from "../../contexts";
import routes from "../../routes";
import Form from "../form/form";

const name = "loginForm";

export default defineForm({
    name,
    context: contexts.state,
    connectToStore: state => ({
        watch: [state.select],
        mapToState: s => s,
    }),
    render(props, { name, csrfToken, isValid, validationErrors, isSubmitPending, submitError }) {
        const nameId = `${ name }-name`;
        const passwordId = `${ name }-password`;
        const actionParams = {};

        if (has(props, "next")) {
            actionParams.next = props.next;
        }

        /* eslint-disable react/jsx-key */
        return (
            <Form
                method={"post"}
                actionRoute={routes.login}
                actionParams={actionParams}
                csrfToken={csrfToken}
                {...loginSheet}
            >
                <label htmlFor={nameId} {...loginLabel}>
                    Name
                </label>
                <input
                    id={nameId}
                    name={"name"}
                    invalid={Boolean(validationErrors.name)}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
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
                    name={"password"}
                    invalid={has(validationErrors, "name")}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
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
