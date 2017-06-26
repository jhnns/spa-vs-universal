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
                        <Link route={routes.top5} className={link}>
                            Top 5
                        </Link>
                    </li>
                    <li className={listItem}>
                        <Link route={routes.allPosts} className={link}>
                            All
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
