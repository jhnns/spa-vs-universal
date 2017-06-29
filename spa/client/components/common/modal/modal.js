import { Component, render as preactRender } from "preact";
import { root, backdrop } from "./modal.css";
import GoBack from "../router/goBack";

export default class Modal extends Component {
    componentWillMount() {
        this.root = document.createElement("section");
        document.body.appendChild(this.root);
    }
    componentWillUnmount() {
        document.body.removeChild(this.root);
    }
    render() {
        preactRender(
            <div class={root}>
                {"..."}
                <GoBack class={backdrop} />
            </div>,
            this.root
        );

        return null;
    }
}
