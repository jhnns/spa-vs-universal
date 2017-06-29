import { Component, render as preactRender } from "preact";
import { root } from "./modal.css";

export default class Modal extends Component {
    componentWillMount() {
        this.root = document.createElement("section");
        document.body.appendChild(this.root);
    }
    componentWillUnmount() {
        document.body.removeChild(this.root);
    }
    render() {
        preactRender(<div class={root}>{"..."}</div>, this.root);

        return null;
    }
}
