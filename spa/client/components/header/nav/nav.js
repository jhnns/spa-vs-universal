import { Component } from "preact";
import Link from "../../common/router/link";
import { list, listItem } from "./nav.css";
import { link, activeLink } from "../link.css";
import routes from "../../../routes";

const nbsp = "\u00a0";

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul class={list}>
                    <li class={listItem}>
                        <Link
                            route={routes.top5}
                            class={link}
                            activeClass={activeLink}
                        >
                            Top{nbsp}5
                        </Link>
                    </li>
                    <li class={listItem}>
                        <Link
                            route={routes.allPosts}
                            class={link}
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
