import { Component } from "preact";
import Logo from "./logo/logo";
import Nav from "./nav/nav";
import Link from "../common/router/link";
import routes from "../../routes";
import { root, content, logo, headline, offscreen } from "./header.css";

export default class Header extends Component {
    render() {
        return (
            <header className={root}>
                <div className={content}>
                    <Link route={routes.top5} className={logo}>
                        <Logo />
                        <h1 className={headline}>
                            <span className={offscreen}>Peerigon</span> News
                        </h1>
                    </Link>
                    <Nav />
                </div>
            </header>
        );
    }
}
