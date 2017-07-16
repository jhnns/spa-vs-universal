import { css } from "glamor";
import { rem } from "../../styles/scales";
import sheet from "../../styles/block/sheet";
import {
    regularFontSize,
    regularLineHeight,
    regularMaxWidth,
    headlineFontSize,
    headlineLineHeight,
} from "../../styles/typoSizes";
import nexaHeavy from "../../styles/type/nexaHeavy";
import latoLight from "../../styles/type/latoLight";

export const root = css({
    position: "relative",
});

export const errorSheet = css({
    ...sheet,
    maxWidth: regularMaxWidth + "rem",
    marginLeft: "auto",
    marginRight: "auto",
});

export const headline = css({
    ...nexaHeavy,
    fontSize: headlineFontSize + "rem",
    lineHeight: headlineLineHeight + "rem",
    ":not(:last-child)": {
        marginBottom: rem(10) + "rem",
    },
});

export const text = css({
    ...latoLight,
    fontSize: regularFontSize + "rem",
    lineHeight: regularLineHeight + "rem",
});
