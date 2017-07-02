import { Component, render as preactRender } from "preact";
import URLSearchParams from "url-search-params";
import WithContext from "../withContext";
import {
    backdrop,
    backdropHidden,
    backdropVisible,
    fadeDuration,
} from "./modal.css";
import GoBack from "../router/goBack";

function getBackParams(modalParam) {
    const params = new URLSearchParams(window.location.search);

    params.delete(modalParam);

    return params;
}

export default class Modal extends Component {
    componentWillMount() {
        this.root = document.createElement("section");
        document.body.appendChild(this.root);
    }
    componentWillUnmount() {
        const root = this.root;

        setTimeout(() => {
            document.body.removeChild(root);
        }, fadeDuration);
    }
    render(props) {
        const isInitialRender = this.root.children.length === 0;
        const mountState =
            new URLSearchParams(location.search).has(props.activationParam) ===
            true;
        const backdropClass = [backdrop];

        backdropClass.push(
            mountState === true ? backdropVisible : backdropHidden
        );

        preactRender(
            <WithContext context={this.context}>
                <GoBack
                    class={backdropClass.join(" ")}
                    params={getBackParams(props.activationParam)}
                />
            </WithContext>,
            this.root,
            isInitialRender === true ? undefined : this.root.firstElementChild
        );

        return null;
    }
}
