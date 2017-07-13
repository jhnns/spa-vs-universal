import { css } from "glamor";
import nexaHeavy from "../../../styles/type/nexaHeavy";
import latoLight from "../../../styles/type/latoLight";
import { rem } from "../../../styles/scales";
import {
    regularFontSize,
    regularLineHeight,
    regularMaxWidth,
    headlineFontSize,
    headlineLineHeight,
    headlineMaxWidth,
} from "../../../styles/typoSizes";

export const headline = css({
    ...nexaHeavy,
    fontSize: headlineFontSize + "rem",
    lineHeight: headlineLineHeight + "rem",
    maxWidth: headlineMaxWidth + "rem",
    marginBottom: rem(6) + "rem",
});

export const aside = css({
    ...latoLight,
    display: "block",
    fontSize: rem(11) + "rem",
    lineHeight: rem(12) + "rem",
    marginBottom: rem(13) + "rem",
});

export const paragraph = css({
    ...latoLight,
    fontSize: regularFontSize + "rem",
    lineHeight: regularLineHeight + "rem",
    maxWidth: regularMaxWidth + "rem",
    ":not(:last-child)": {
        marginBottom: rem(10) + "rem",
    },
});
