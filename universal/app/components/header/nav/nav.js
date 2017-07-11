import Link from "../../router/link";
import { list, listItem } from "./nav.css";
import { link, activeLink } from "../link.css";
import routes from "../../../routes";
import { nbsp } from "../../../util/htmlEntities";
import defineComponent from "../../util/defineComponent";

export default defineComponent({
    name: "Nav",
    render(props) {
        return (
            <nav {...props.styles}>
                <ul {...list}>
                    <li {...listItem}>
                        <Link route={routes.top5} activeClass={activeLink} {...link}>
                            Top{nbsp}5
                        </Link>
                    </li>
                    <li {...listItem}>
                        <Link route={routes.allPosts} activeClass={activeLink} {...link}>
                            All
                        </Link>
                    </li>
                    <li {...listItem}>
                        <Link route={routes.about} activeClass={activeLink} {...link}>
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    },
});
