import { Component } from "preact";
import Personal from "./personal/personal";
import Anonymous from "./anonymous/anonymous";

export default class Profile extends Component {
    render(props) {
        const user = props.user;

        return (
            <div className={props.className}>
                {user ? <Personal user={user} /> : <Anonymous />}
            </div>
        );
    }
}
