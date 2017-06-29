import { Component } from "preact";
import Logo from "./logo/logo";
import Nav from "./nav/nav";
import Link from "../common/router/link";
import routes from "../../routes";
import {
    root,
    content,
    logo,
    headline,
    profile,
    offscreen,
} from "./header.css";
import Profile from "./profile/profile";

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
                    <Nav />
                    <Profile class={profile} />
                </div>
            </header>
        );
    }
}
