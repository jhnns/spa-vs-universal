import defineForm from "../form/defineForm";
import FormFeedback from "../formFeedback/formFeedback";
import validators from "./loginFormValidators";
import { loginSheet, loginInput, loginLabel, loginSubmit, formFeedback } from "./loginForm.css";
import has from "../../util/has";
import contexts from "../../contexts";
import routes from "../../routes";

const emptyObj = {};

const form = defineForm({
    name: "loginForm",
    stateContext: contexts.state,
    validators,
    render({ autoFocus = false }, { name, isValid, validationErrors, isSubmitPending, submitError }) {
        const nameId = `${ name }-login-name`;
        const passwordId = `${ name }-login-password`;

        /* eslint-disable react/jsx-key */
        return [
            <label htmlFor={nameId} {...loginLabel}>
                Name
            </label>,
            <input
                id={nameId}
                name={"name"}
                invalid={Boolean(validationErrors.name)}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                type="text"
                // Let the loginForm user decide if autoFocus is appropriate
                autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
                {...loginInput}
            />,
            <FormFeedback {...formFeedback}>
                {validationErrors.name}
            </FormFeedback>,
            <label htmlFor={passwordId} {...loginLabel}>
                Password
            </label>,
            <input
                id={passwordId}
                name={"password"}
                invalid={has(validationErrors, "name")}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                type="password"
                {...loginInput}
            />,
            <FormFeedback {...formFeedback}>
                {validationErrors.password}
                {submitError === null ? null : submitError.message}
            </FormFeedback>,
            <input
                type="submit"
                value="Log in"
                data-pending={isSubmitPending}
                disabled={isSubmitPending}
                {...loginSubmit}
            />,
        ];
        /* eslint-enable react/jsx-key */
    },
});

export const state = form.state;

export default function LoginForm(props) {
    const LoginForm = form.Component;

    return <LoginForm {...props} actionRoute={routes.login} actionParams={emptyObj} styles={loginSheet} />;
}
