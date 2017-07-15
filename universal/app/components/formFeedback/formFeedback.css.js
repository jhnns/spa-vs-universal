import { css } from "glamor";
import { asideFontSize, asideLineHeight } from "../../styles/typoSizes";
import { red } from "../../styles/colors";
import latoLight from "../../styles/type/latoLight";
import { msToSeconds } from "../../styles/timing";

export const transitionDuration = 100;

const transitionDurationCss = msToSeconds(100) + "s";

export const overflowContainer = css({
    display: "inline-block",
    overflow: "hidden",
    transition: `height ${ transitionDurationCss } ease-in-out`,
});

export const message = css({
    ...latoLight,
    display: "inline-block",
    color: red(),
    fontSize: asideFontSize + "rem",
    lineHeight: asideLineHeight + "rem",
    minHeight: asideLineHeight + "rem",
    transform: "translateY(0)",
    transition: `transform ${ transitionDurationCss } ease-in-out`,
    ":empty": {
        transform: "translateY(-100%)",
    },
});
