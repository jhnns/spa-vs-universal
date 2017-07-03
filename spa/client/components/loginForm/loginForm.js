import { Component } from "preact";
import { loginSheet, loginInput, loginLabel } from "./loginForm.css";
import generateId from "../util/generateId";

export default class LoginForm extends Component {
    constructor() {
        super();
        this.id = generateId();
    }
    render(props, state) {
        const nameId = `${ this.id }-login-name`;
        const passwordId = `${ this.id }-login-password`;

        return (
            <div class={loginSheet}>
                <label htmlFor={nameId} class={loginLabel}>
                    Login
                </label>
                <input id={nameId} class={loginInput} type="text" />
                <label htmlFor={passwordId} class={loginLabel}>
                    Password
                </label>
                <input id={passwordId} class={loginInput} type="password" />
            </div>
        );
    }
}
