import logoSrc from "../../../assets/img/peerigonLogoMint.svg";
import { logoImg } from "./logo.css";

export default function Logo() {
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
