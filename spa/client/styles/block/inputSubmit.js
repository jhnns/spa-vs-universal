import { rem } from "../../styles/scales";
import { mint } from "../../styles/colors";
import { regularFontSize, regularLineHeight } from "../../styles/typoSizes";
import nexaXBold from "../../styles/type/nexaXBold";
import { regular } from "../borders";

export default {
    ...nexaXBold,
    width: "100%",
    fontSize: regularFontSize + "rem",
    lineHeight: regularLineHeight + "rem",
    padding: rem(7) + "rem 0",
    border: "none",
    outline: "none",
    backgroundColor: mint(),
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0.3)",
    transition: "box-shadow 0.1s ease-in-out",
    ":hover": {
        cursor: "pointer",
        boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.2), -3px 3px 3px rgba(0, 0, 0, 0.2)",
    },
    ":focus": {
        outline: regular(),
    },
};
