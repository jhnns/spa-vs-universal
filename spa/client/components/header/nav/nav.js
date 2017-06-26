import { Component } from "preact";
import Link from "../../router/link";
import { list, listItem, link, activeLink } from "./nav.css";
import routes from "../../../routes";

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul className={list}>
                    <li className={listItem}>
                        <Link
                            route={routes.top5}
                            className={link}
                            activeClass={activeLink}
                        >
                            Top 5
                        </Link>
                    </li>
                    <li className={listItem}>
                        <Link
                            route={routes.allPosts}
                            className={link}
                            activeClass={activeLink}
                        >
                            All
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
