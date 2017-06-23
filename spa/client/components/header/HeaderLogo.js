import { Component } from "preact";
import logoSrc from "../../assets/img/peerigon-logo-mint.svg";
import { logoImg } from "./HeaderLogo.css";

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
