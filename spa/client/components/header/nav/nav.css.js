import cxs from "cxs";
import { px, rem } from "../../../styles/scales";
import nexaHeavy from "../../../styles/type/nexaHeavy";
import { baseLine } from "../common";
import {
    regular as regularBorder,
    regularWidth as regularBorderWidth,
} from "../../../styles/borders";
import calc from "../../../styles/calc";

const linkFontSize = rem(2);

const activeLinkStyles = {
    borderBottom: regularBorder(),
};

export const list = cxs({
    display: "flex",
    listStyleType: "none",
});

export const listItem = cxs({
    ":not(:last-child)": {
        marginRight: px(5),
    },
});

export const link = cxs({
    ...nexaHeavy,
    position: "relative",
    top: calc(
        (baseLine - linkFontSize) / 2,
        "rem",
        " + ",
        regularBorderWidth,
        "px"
    ),
    color: "inherit",
    fontSize: "1rem",
    textDecoration: "none",
    padding: `1px ${ px(5) }px`,
    ":hover": activeLinkStyles,
    ":active": activeLinkStyles,
});

export const activeLink = cxs(activeLinkStyles);
