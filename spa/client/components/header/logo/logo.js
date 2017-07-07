import { Component } from "preact";
import logoSrc from "../../../assets/img/peerigonLogoMint.svg";
import { logoImg } from "./logo.css";

export default class Logo extends Component {
    render() {
        return (
            <img
                class={logoImg}
                src={logoSrc}
                /* Do not display when CSS is not working */
                height={0}
                alt={"Peerigon logo"}
            />
        );
    }
}
