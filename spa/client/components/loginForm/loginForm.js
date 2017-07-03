import { Component } from "preact";
import {
    loginSheet,
    loginInput,
    loginLabel,
    loginSubmit,
} from "./loginForm.css";
import Form from "../form/form";

export default class LoginForm extends Component {
    constructor() {
        super();
        this.renderForm = this.renderForm.bind(this);
    }
    renderForm({ id }) {
        const nameId = `${ id }-login-name`;
        const passwordId = `${ id }-login-password`;

        /* eslint-disable react/jsx-key */
        return [
            <label htmlFor={nameId} class={loginLabel}>
                Name
            </label>,
            <input id={nameId} class={loginInput} type="text" />,
            <label htmlFor={passwordId} class={loginLabel}>
                Password
            </label>,
            <input id={passwordId} class={loginInput} type="password" />,
            <input class={loginSubmit} type="submit" value="Log in" />,
        ];
        /* eslint-enable react/jsx-key */
    }
    render(props, state) {
        return (
            <Form class={loginSheet}>
                {this.renderForm}
            </Form>
        );
    }
}
