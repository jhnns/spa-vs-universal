import { Component } from "preact";
import logoSrc from "../../../assets/img/peerigonLogoMint.svg";
import { logoImg } from "./logo.css";

export default class HeaderLogo extends Component {
    render() {
        return (
            <div>
                <img
                    class={logoImg}
                    src={logoSrc}
                    /* Do not display when CSS is not working */
                    height={0}
                    alt={"Peerigon logo"}
                />
            </div>
        );
    }
}
