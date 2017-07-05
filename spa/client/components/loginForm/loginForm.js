import { Component } from "preact";
import FormFeedback from "../formFeedback/formFeedback";
import loginFormValidators from "./loginFormValidators";
import createSession from "../../api/session/create";
import {
    loginSheet,
    loginInput,
    loginLabel,
    loginSubmit,
    formFeedback,
} from "./loginForm.css";
import Form from "../form/form";

export default class LoginForm extends Component {
    constructor() {
        super();
        this.renderForm = this.renderForm.bind(this);
    }
    renderForm({ id, errors, submitPending, submitError }) {
        const nameId = `${ id }-login-name`;
        const passwordId = `${ id }-login-password`;

        /* eslint-disable react/jsx-key */
        return [
            <label htmlFor={nameId} class={loginLabel}>
                Name
            </label>,
            <input
                id={nameId}
                name={"name"}
                class={loginInput}
                invalid={Boolean(errors.get("name"))}
                type="text"
            />,
            <FormFeedback class={formFeedback}>
                {errors.get("name")}
            </FormFeedback>,
            <label htmlFor={passwordId} class={loginLabel}>
                Password
            </label>,
            <input
                id={passwordId}
                name={"password"}
                class={loginInput}
                invalid={Boolean(errors.get("password"))}
                type="password"
            />,
            <FormFeedback class={formFeedback}>
                {errors.get("password")}
                {submitError === null ? null : submitError.message}
            </FormFeedback>,
            <input
                class={loginSubmit}
                type="submit"
                value="Log in"
                data-pending={submitPending}
                disabled={errors.size !== 0 || submitPending}
            />,
        ];
        /* eslint-enable react/jsx-key */
    }
    render(props, state) {
        return (
            <Form
                class={loginSheet}
                validators={loginFormValidators}
                onSubmit={createSession}
                onSubmitSuccess={props.handleLogin}
            >
                {this.renderForm}
            </Form>
        );
    }
}
