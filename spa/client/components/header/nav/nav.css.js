import cxs from "cxs";
import { px, rem } from "../../../styles/scales";
import nexaXBold from "../../../styles/type/nexaXBold";
import { regular as regularBorder } from "../../../styles/borders";

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
        marginRight: px(10),
    },
});

export const link = cxs({
    ...nexaXBold,
    color: "currentColor",
    fontSize: rem(12) + "rem",
    textDecoration: "none",
    padding: `2px ${ px(5) }px`,
    ":hover": activeLinkStyles,
    ":active": activeLinkStyles,
});

export const activeLink = cxs(activeLinkStyles);
