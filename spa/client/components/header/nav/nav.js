import { Component } from "preact";
import { list, listItem, link } from "./nav.css";

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul className={list}>
                    <li className={listItem}>
                        <a className={link} href="/">Home</a>
                    </li>
                    <li className={listItem}>
                        <a className={link} href="/about">About</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
