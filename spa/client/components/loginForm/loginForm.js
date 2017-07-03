import { Component } from "preact";
import ValidationMessage from "../validationMessage/validationMessage";
import loginFormValidators from "./loginFormValidators";
import {
    loginSheet,
    loginInput,
    loginLabel,
    loginSubmit,
    validationMessage,
} from "./loginForm.css";
import Form from "../form/form";

export default class LoginForm extends Component {
    constructor() {
        super();
        this.renderForm = this.renderForm.bind(this);
    }
    renderForm({ id, errors }) {
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
            <ValidationMessage class={validationMessage}>
                {errors.get("name")}
            </ValidationMessage>,
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
            <ValidationMessage class={validationMessage}>
                {errors.get("password")}
            </ValidationMessage>,
            <input class={loginSubmit} type="submit" value="Log in" />,
        ];
        /* eslint-enable react/jsx-key */
    }
    render(props, state) {
        return (
            <Form class={loginSheet} validators={loginFormValidators}>
                {this.renderForm}
            </Form>
        );
    }
}
