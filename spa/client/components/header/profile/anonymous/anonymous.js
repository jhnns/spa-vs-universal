import { Component } from "preact";
import URLSearchParams from "url-search-params";
import Link from "../../../common/router/link";
import { link } from "../../link.css";

export default class Anonymous extends Component {
    componentWillMount() {
        this.updateSearchParams();
    }
    componentWillReceiveProps() {
        this.updateSearchParams();
    }
    shouldComponentUpdate() {
        return window.location.search !== location.search;
    }
    updateSearchParams() {
        this.locationSearch = window.location.search;
        this.searchParams = new URLSearchParams(window.location.search);
        this.searchParams.set("showLogin", true);
    }
    render() {
        return (
            <Link params={this.searchParams} className={link}>
                {"Log in"}
            </Link>
        );
    }
}
