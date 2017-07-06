import { css } from "glamor";
import { mintLight35, silverLight10, black } from "../../styles/colors";
import { linear } from "../../styles/gradients";
import { maxContentWidth } from "../../styles/layout";
import { paddingRegular } from "../../styles/paddings";

import "../../styles/reset"; // eslint-disable-line import/no-unassigned-import

export const root = css({
    margin: 0,
    color: black(),
    backgroundImage: linear("to bottom", [silverLight10(), mintLight35() + " 70vh"]),
    minHeight: "100vh",
});

export const main = css({
    maxWidth: maxContentWidth + "rem",
    marginLeft: "auto",
    marginRight: "auto",
    ["@media (min-width: " + paddingRegular * 20 + "px)"]: {
        padding: paddingRegular,
    },
});
