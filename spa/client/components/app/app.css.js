import { css } from "glamor";
import { mintLight35, silverLight10, black } from "../../styles/colors";
import { linear } from "../../styles/gradient";
import { maxContentWidth } from "../../styles/layout";
import { documentPadding } from "../../styles/paddings";

export const root = css({
    margin: 0,
    color: black(),
    backgroundImage: linear("to bottom", [
        silverLight10(),
        mintLight35() + " 70vh",
    ]),
    minHeight: "100vh",
});

export const main = css({
    maxWidth: maxContentWidth,
    marginLeft: "auto",
    marginRight: "auto",
    ["@media (min-width: " + documentPadding * 20 + "px)"]: {
        padding: documentPadding,
    },
});
