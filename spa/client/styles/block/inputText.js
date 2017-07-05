import { rem } from "../../styles/scales";
import { mint, red } from "../../styles/colors";
import { regularFontSize, regularLineHeight } from "../../styles/typoSizes";
import latoLight from "../../styles/type/latoLight";
import { regular } from "../borders";

const mobileSafariStyleFixes = {
    "-webkit-appearance": "none",
    borderRadius: 0,
};

export default {
    ...latoLight,
    ...mobileSafariStyleFixes,
    width: "100%",
    fontSize: regularFontSize + "rem",
    lineHeight: regularLineHeight + "rem",
    padding: rem(7) + "rem 0",
    border: "none",
    borderBottom: regular(),
    outline: "none",
    ":focus": {
        borderColor: mint(),
        outlineColor: mint(),
    },
    "[invalid]": {
        borderBottomColor: red(),
    },
};
