import { css } from "glamor";
import { asideFontSize, asideLineHeight } from "../../styles/typoSizes";
import { red } from "../../styles/colors";
import latoLight from "../../styles/type/latoLight";

export const overflowContainer = css({
    display: "inline-block",
    overflow: "hidden",
});

export const message = css({
    ...latoLight,
    display: "inline-block",
    color: red(),
    fontSize: asideFontSize + "rem",
    lineHeight: asideLineHeight + "rem",
    minHeight: asideLineHeight + "rem",
    ":empty": {
        transform: "translateY(-100%)",
    },
});
