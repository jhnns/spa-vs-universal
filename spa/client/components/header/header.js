import { Component } from "preact";
import Logo from "./logo/logo";
import Nav from "./nav/nav";
import { root, logo, headline, offscreen } from "./header.css";

export default class Header extends Component {
    render() {
        return (
            <header className={root}>
                <a href="/" className={logo}>
                    <Logo />
                    <h1 className={headline}>
                        <span className={offscreen}>Peerigon</span> News
                    </h1>
                </a>
                <Nav />
            </header>
        );
    }
}
