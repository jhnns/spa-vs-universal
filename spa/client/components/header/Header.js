import { Component } from "preact";
import Logo from "./HeaderLogo";
import { root, logo, headline, offscreen } from "./Header.css";

export default class Header extends Component {
    render() {
        return (
            <header className={root}>
                <div className={logo}>
                    <Logo />
                    <h1 className={headline}>
                        <span className={offscreen}>Peerigon</span> News
                    </h1>
                </div>
            </header>
        );
    }
}
