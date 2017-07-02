import { css } from "glamor";
import { px, rem } from "../../styles/scales";
import { white } from "../../styles/colors";
import {
    regularFontSize,
    regularLineHeight,
    regularMaxWidth,
    headlineFontSize,
    headlineLineHeight,
} from "../../styles/typoSizes";
import nexaHeavy from "../../styles/type/nexaHeavy";
import latoLight from "../../styles/type/latoLight";

const sheetPadding = px(13);

export const root = css({
    position: "relative",
});

export const sheet = css({
    ...sheetPadding,
    maxWidth: regularMaxWidth + "rem",
    padding: sheetPadding,
    backgroundColor: white(),
    marginLeft: "auto",
    marginRight: "auto",
});

export const title = css({
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
