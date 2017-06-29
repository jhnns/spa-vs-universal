import { css } from "glamor";
import { mintLight35, silverLight10, black } from "../../../styles/colors";
import { linear } from "../../../styles/gradient";

export const root = css({
    margin: 0,
    color: black(),
    backgroundImage: linear("to bottom", [
        silverLight10(),
        mintLight35() + " 70vh",
    ]),
    minHeight: "100vh",
});
