import { css } from "glamor";
import { rem } from "../../styles/scales";
import sheet from "../../styles/block/sheet";
import { regularFontSize, regularLineHeight } from "../../styles/typoSizes";
import latoLight from "../../styles/type/latoLight";
import inputText from "../../styles/block/inputText";
import inputSubmit from "../../styles/block/inputSubmit";
import { paddingBigger } from "../../styles/paddings";

export const loginSheet = css({
    ...sheet,
    ...latoLight,
    maxWidth: rem(29) + "rem",
    boxSizing: "border-box",
    padding: paddingBigger,
    fontSize: regularFontSize + "rem",
    lineHeight: regularLineHeight + "rem",
    display: "flex",
    flexDirection: "column",
});

export const loginLabel = css({
    ":after": {
        content: JSON.stringify(":"),
    },
});

export const loginInput = css({
    ...inputText,
});

export const formFeedback = css({
    marginBottom: rem(10) + "rem",
});

export const loginSubmit = css(inputSubmit);
