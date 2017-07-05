import { Component } from "preact";
import Link from "../../../router/link";
import { root, userName, userImage } from "./personal.css";
import headerLink from "../../link.css";

export default class Personal extends Component {
    render(props) {
        const user = props.user;

        if (user === null) {
            return null;
        }

        return (
            <div class={root}>
                <img class={userImage} src={user.image} alt={user.name} />
                <span class={userName}>{user.name}</span>
                <span>
                    <Link class={headerLink}>
                        {"Log out"}
                    </Link>
                </span>
            </div>
        );
    }
}
