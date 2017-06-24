import { Component } from "preact";
import logoSrc from "../../assets/img/peerigonLogoMint.svg";
import { logoImg } from "./headerLogo.css";

export default class HeaderLogo extends Component {
    render() {
        return (
            <div>
                <img
                    className={logoImg}
                    src={logoSrc}
                    /* Do not display when CSS is not working */
                    width={0}
                    alt={"Peerigon logo"}
                />
            </div>
        );
    }
}
