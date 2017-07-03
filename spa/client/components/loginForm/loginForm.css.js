import { css } from "glamor";
import { px, rem } from "../../styles/scales";
import { white, mint } from "../../styles/colors";
import sheet, { sheetPadding } from "../../styles/block/sheet";
import { regularFontSize, regularLineHeight } from "../../styles/typoSizes";
import nexaHeavy from "../../styles/type/nexaHeavy";
import latoLight from "../../styles/type/latoLight";
import inputText from "../../styles/block/inputText";
import { paddingBigger } from "../../styles/paddings";

export const loginSheet = css({
    ...sheet,
    ...latoLight,
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
    minWidth: rem(27) + "rem",
    marginBottom: rem(14) + "rem",
});
