import { Component } from "preact";
import URLSearchParams from "url-search-params";
import Link from "../../../router/link";
import Modal from "../../../modal/modal";
import Placeholder from "../../../util/placeholder";
import { link } from "../../link.css";
import useDefault from "../../../../util/useDefault";
import RoutingContext from "../../../router/util/routingContext";

function loadLoginForm() {
    return useDefault(import("../../../loginForm/loginForm"));
}

export default class Anonymous extends Component {
    constructor() {
        super();
        this.loginFormProps = {
            handleLogin: this.handleLogin.bind(this),
        };
        this.routingContext = new RoutingContext(this);
    }
    handleLogin() {
        const current = this.routingContext.current();
        const paramsWithoutLogin = new URLSearchParams(window.location.search);

        paramsWithoutLogin.delete("showLogin");

        this.routingContext.next(current.route, paramsWithoutLogin);
    }
    render() {
        const paramsAndShowLogin = new URLSearchParams(window.location.search);

        paramsAndShowLogin.set("showLogin", 1);

        return (
            <div>
                <Link params={paramsAndShowLogin} class={link}>
                    {"Log in"}
                </Link>
                <Modal activationParam={"showLogin"}>
                    <Placeholder
                        component={loadLoginForm}
                        props={this.loginFormProps}
                    />
                </Modal>
            </div>
        );
    }
}
