import { Component } from "preact";
import Logo from "./logo/logo";
// import Nav from "./nav/nav";
import Link from "../router2/link";
import routes from "../../routes";
import { root, content, logo, nav, headline, session, offscreen } from "./header.css";
// import Session from "./session/session";

export default function Header() {
    return (
        <header {...root}>
            <div {...content}>
                <Link route={routes.top5} {...logo}>
                    <Logo />
                    <h1 {...headline}>
                        <span {...offscreen}>Peerigon</span> News
                    </h1>
                </Link>
                {/* <Nav class={nav} /> */}
                {/* <Session class={session} /> */}
            </div>
        </header>
    );
}
