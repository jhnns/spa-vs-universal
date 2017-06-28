import { Component, render as preactRender } from "preact";

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
            <div style={"position: fixed; top: 0; font-size: 5rem"}>Test</div>,
            this.root
        );

        return null;
    }
}
