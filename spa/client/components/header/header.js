import { Component } from "preact";
import Logo from "./logo/logo";
import Nav from "./nav/nav";
import Link from "../router/link";
import routes from "../../routes";
import {
    root,
    content,
    logo,
    nav,
    headline,
    session,
    offscreen,
} from "./header.css";
import Session from "./session/session";

export default class Header extends Component {
    render() {
        return (
            <header class={root}>
                <div class={content}>
                    <Link route={routes.top5} class={logo}>
                        <Logo />
                        <h1 class={headline}>
                            <span class={offscreen}>Peerigon</span> News
                        </h1>
                    </Link>
                    <Nav class={nav} />
                    <Session class={session} />
                </div>
            </header>
        );
    }
}
