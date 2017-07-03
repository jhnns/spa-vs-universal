import { Component } from "preact";

export default class LoginForm extends Component {
    render(props, state) {
        return (
            <div>
                <input type="text" />
                <input type="password" />
            </div>
        );
    }
}
