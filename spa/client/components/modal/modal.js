import { Component, render as preactRender } from "preact";
import URLSearchParams from "url-search-params";
import WithContext from "../util/withContext";
import {
    root,
    backdrop,
    backdropHidden,
    backdropVisible,
    fadeDuration,
    window as modalWindow,
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
        this.renderContainer = document.createElement("section");
        this.updateActiveState(props);
    }
    componentWillReceiveProps(newProps) {
        this.updateActiveState(newProps);
    }
    updateActiveState(props) {
        this.setState(prevState => {
            const active =
                new URLSearchParams(location.search).has(
                    props.activationParam
                ) === true;

            if (prevState.active === true && active === false) {
                setTimeout(() => {
                    if (this.state.active === true) {
                        return;
                    }
                    document.body.removeChild(this.renderContainer);
                }, fadeDuration);
            } else if (prevState.active === false && active === true) {
                document.body.appendChild(this.renderContainer);
                // Trigger reflow to kick off the transition
                void this.renderContainer.offsetHeight;
            }

            return {
                active,
            };
        });
    }
    render(props, state) {
        const backdropClass = [
            backdrop,
            state.active === true ? backdropVisible : backdropHidden,
        ];

        preactRender(
            <WithContext context={this.context}>
                <div class={root}>
                    <GoBack
                        class={backdropClass.join(" ")}
                        params={getBackParams(props.activationParam)}
                    />
                    {props.render || state.active ?
                        <div class={modalWindow}>
                            {props.children}
                        </div> :
                        null}
                </div>
            </WithContext>,
            this.renderContainer,
            this.renderContainer.firstElementChild
        );

        return null;
    }
}
