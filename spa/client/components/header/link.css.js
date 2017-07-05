import { css } from "glamor";
import { px, rem } from "../../styles/scales";
import nexaXBold from "../../styles/type/nexaXBold";
import { regular as regularBorder } from "../../styles/borders";

const activeLinkStyles = {
    borderTop: regularBorder("transparent"),
    borderBottom: regularBorder(),
};

export const active = css(activeLinkStyles);

export default css({
    ...nexaXBold,
    color: "currentColor",
    fontSize: rem(12) + "rem",
    textDecoration: "none",
    padding: `2px ${ px(5) }px`,
    ":hover": activeLinkStyles,
    ":active": activeLinkStyles,
});
