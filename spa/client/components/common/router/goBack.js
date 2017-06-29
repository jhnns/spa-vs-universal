import { Component } from "preact";

function back() {
    history.back();
}

export default class GoBack extends Component {
    render(props) {
        return (
            <a {...props} href={"?"} onClick={back}>
                {props.children}
            </a>
        );
    }
}
