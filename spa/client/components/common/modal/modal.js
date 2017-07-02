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
    constructor(props) {
        super();
        this.updateMountState(props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateMountState(nextProps);
    }
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
    updateMountState(props) {
        const params = new URLSearchParams(location.search);

        this.mountState = params.has(props.activationParam) === true;
    }
    render(props) {
        const isInitialRender = this.root.children.length === 0;
        const backdropClass = [backdrop];

        backdropClass.push(
            this.mountState === true ? backdropVisible : backdropHidden
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
