import { Component } from "preact";
import Link from "../../router/link";
import { list, listItem } from "./nav.css";
import { link, activeLink } from "../link.css";
import routes from "../../../routes";
import { nbsp } from "../../../util/htmlEntities";

export default class Nav extends Component {
    render(props) {
        return (
            <nav class={props.class}>
                <ul class={list}>
                    <li class={listItem}>
                        <Link route={routes.top5} class={link} activeClass={activeLink}>
                            Top{nbsp}5
                        </Link>
                    </li>
                    <li class={listItem}>
                        <Link route={routes.allPosts} class={link} activeClass={activeLink}>
                            All
                        </Link>
                    </li>
                    <li class={listItem}>
                        <Link route={routes.about} class={link} activeClass={activeLink}>
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
