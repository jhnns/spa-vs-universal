import { Component, render as preactRender } from "preact";
import {
    root,
    backdrop,
    backdropFadeIn,
    backdropFadeOut,
    fadeDuration,
} from "./modal.css";
import GoBack from "../router/goBack";

export default class Modal extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        this.root = document.createElement("section");
        document.body.appendChild(this.root);
    }
    handleClick(event) {
        const goBackLink = event.target;

        goBackLink.classList.remove(backdropFadeIn);
        goBackLink.classList.add(backdropFadeOut);

        setTimeout(() => {
            document.body.removeChild(this.root);
        }, fadeDuration);
    }
    render() {
        preactRender(
            <div class={root}>
                {"..."}
                <GoBack
                    class={[backdrop, backdropFadeIn].join(" ")}
                    onClick={this.handleClick}
                />
            </div>,
            this.root
        );

        return null;
    }
}
