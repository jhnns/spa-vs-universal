import { Component } from "preact";
import destroySession from "../../../../api/session/destroy";
import { root, userName, userImage } from "./personal.css";
import { nbsp } from "../../../../util/htmlEntities";
import { link } from "../../link.css";

export default class Personal extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        destroySession();
    }
    render(props) {
        const user = props.user;

        if (user === null) {
            return null;
        }

        return (
            <div class={root}>
                <img class={userImage} src={user.image} alt={user.name} />
                <span class={userName}>
                    {user.name}
                </span>
                <span>
                    <a href={window.location.href} class={link} onClick={this.handleLogout}>
                        Log{nbsp}out
                    </a>
                </span>
            </div>
        );
    }
}
