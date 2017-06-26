import { Component } from "preact";
import Link from "../../router/link";
import { list, listItem, link } from "./nav.css";
import routes from "../../../routes";

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul className={list}>
                    <li className={listItem}>
                        <Link route={routes.home} className={link}>Home</Link>
                    </li>
                    <li className={listItem}>
                        <Link route={routes.about} className={link}>About</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
