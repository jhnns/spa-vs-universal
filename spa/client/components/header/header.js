import { Component } from "preact";
import Logo from "../headerLogo/headerLogo";
import { root, logo, headline, offscreen } from "./header.css";

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
