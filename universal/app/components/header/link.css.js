import { css } from "glamor";
import { px, rem } from "../../styles/scales";
import nexaXBold from "../../styles/type/nexaXBold";
import { regular as regularBorder } from "../../styles/borders";

const activeLinkStyles = {
    borderTop: regularBorder("transparent"),
    borderBottom: regularBorder(),
};

export const activeLink = css(activeLinkStyles);

export const link = css({
    ...nexaXBold,
    // There's a small baseline correction necessary
    position: "relative",
    top: 1,
    color: "currentColor",
    fontSize: rem(12) + "rem",
    textDecoration: "none",
    padding: `2px ${ px(5) }px`,
    cursor: "pointer",
    ":hover": activeLinkStyles,
    ":active": activeLinkStyles,
});
