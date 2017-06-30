import { Component, render as preactRender } from "preact";
import URLSearchParams from "url-search-params";
import WithContext from "../withContext";
import {
    root,
    backdrop,
    backdropFadeIn,
    backdropFadeOut,
    fadeDuration,
} from "./modal.css";
import GoBack from "../router/goBack";

function getBackParams(modalParam) {
    const params = new URLSearchParams(window.location.search);

    params.delete(modalParam);

    return params;
}

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
    render(props) {
        preactRender(
            <WithContext context={this.context}>
                <div class={root}>
                    {"..."}
                    <GoBack
                        class={[backdrop, backdropFadeIn].join(" ")}
                        params={getBackParams(props.activationParam)}
                        onClick={this.handleClick}
                    />
                </div>,
            </WithContext>,
            this.root
        );

        return null;
    }
}
