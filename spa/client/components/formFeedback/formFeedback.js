import { Component } from "preact";
import { overflowContainer, message } from "./formFeedback.css";

export default class FormFeedback extends Component {
    render(props) {
        return (
            <span class={`${ overflowContainer } ${ props.class || "" }`}>
                <span class={message}>
                    {props.children}
                </span>
            </span>
        );
    }
}
