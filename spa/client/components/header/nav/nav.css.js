import cxs from "cxs";
import { px, rem } from "../../../styles/scales";
import nexaHeavy from "../../../styles/type/nexaHeavy";
import { baseLine } from "../header.css";

const linkFontSize = rem(2);

export const list = cxs({
    display: "flex",
    listStyleType: "none",
});

export const link = cxs({
    ...nexaHeavy,
    position: "relative",
    top: (baseLine - linkFontSize) / 2 + "rem",
    fontSize: linkFontSize + "rem",
    color: "inherit",
    textDecoration: "none",
    padding: px(5),
});
