import { Component } from "preact";
import Link from "../../router/link";
import { list, listItem } from "./nav.css";
import headerLink, { active as activeLink } from "../link.css";
import routes from "../../../routes";

const nbsp = "\u00a0";

export default class Nav extends Component {
    render(props) {
        return (
            <nav class={props.class}>
                <ul class={list}>
                    <li class={listItem}>
                        <Link
                            route={routes.top5}
                            class={headerLink}
                            activeClass={activeLink}
                        >
                            Top{nbsp}5
                        </Link>
                    </li>
                    <li class={listItem}>
                        <Link
                            route={routes.allPosts}
                            class={headerLink}
                            activeClass={activeLink}
                        >
                            All
                        </Link>
                    </li>
                    <li class={listItem}>
                        <Link
                            route={routes.about}
                            class={headerLink}
                            activeClass={activeLink}
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
