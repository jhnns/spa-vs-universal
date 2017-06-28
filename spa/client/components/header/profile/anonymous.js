import { Component } from "preact";
import URLSearchParams from "url-search-params";
import Link from "../../common/router/link";

export default class Anonymous extends Component {
    render() {
        const newParams = new URLSearchParams(window.location.search);

        newParams.set("showLogin", true);

        return <Link params={newParams}>{"Log in"}</Link>;
    }
}
