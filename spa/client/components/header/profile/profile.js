import { Component } from "preact";
import Personal from "./personal/personal";
import Anonymous from "./anonymous/anonymous";
import localSession from "../../../api/session/local";

export default class Profile extends Component {
    render(props) {
        const user = localSession.user;

        return (
            <div class={props.class}>
                {user ? <Personal user={user} /> : <Anonymous />}
            </div>
        );
    }
}
