import { Component } from "preact";
import URLSearchParams from "url-search-params";
import Link from "../../../common/router/link";
import Modal from "../../../common/modal/modal";
import { link } from "../../link.css";

export default class Anonymous extends Component {
    constructor() {
        super();
        this.updateSearchParams();
    }
    componentWillUpdate() {
        this.updateSearchParams();
    }
    shouldComponentUpdate() {
        return window.location.search !== this.locationSearch;
    }
    updateSearchParams() {
        const search = window.location.search;
        const params = new URLSearchParams(search);

        params.set("showLogin", 1);

        this.locationSearch = search;
        this.paramsAndShowLogin = params;
    }
    render() {
        return (
            <div>
                <Link params={this.paramsAndShowLogin} class={link}>
                    {"Log in"}
                </Link>
                <Modal activationParam={"showLogin"} />
            </div>
        );
    }
}
