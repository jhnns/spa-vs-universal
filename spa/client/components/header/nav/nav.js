import { Component } from "preact";
import { list, link } from "./nav.css";

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul className={list}>
                    <li>
                        <a className={link} href="/">Home</a>
                    </li>
                    <li>
                        <a className={link} href="/about">About</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
