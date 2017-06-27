import cxs from "cxs";
import { px, rem } from "../../../styles/scales";
import nexaXBold from "../../../styles/type/nexaXBold";
import { baseLine } from "../common";
import {
    regular as regularBorder,
    regularWidth as regularBorderWidth,
} from "../../../styles/borders";
import calc from "../../../styles/calc";

const linkFontSize = rem(2);

const activeLinkStyles = {
    borderTop: regularBorder("transparent"),
    borderBottom: regularBorder(),
};

export const list = cxs({
    display: "flex",
    listStyleType: "none",
});

export const listItem = cxs({
    ":not(:last-child)": {
        marginRight: px(6),
    },
});

export const link = cxs({
    ...nexaXBold,
    color: "inherit",
    fontSize: "1rem",
    textDecoration: "none",
    padding: `2px ${ px(5) }px`,
    ":hover": activeLinkStyles,
    ":active": activeLinkStyles,
});

export const activeLink = cxs(activeLinkStyles);
