import { Component } from "preact";
import Personal from "./personal";
import Anonymous from "./anonymous";

export default class Profile extends Component {
    render(props) {
        const user = props.user;

        return user ? <Personal user={user} /> : <Anonymous />;
    }
}
