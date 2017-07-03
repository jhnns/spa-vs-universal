import { Component } from "preact";
import { overflowContainer, message } from "./validationMessage.css";

export default class ValidationMessage extends Component {
    render(props) {
        return (
            <span class={`${ overflowContainer } ${ props.class || "" }`}>
                <span class={message}>{props.children[0]}</span>
            </span>
        );
    }
}
