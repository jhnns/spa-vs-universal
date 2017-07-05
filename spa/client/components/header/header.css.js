import { css } from "glamor";
import { white, black } from "../../styles/colors";
import { px, rem } from "../../styles/scales";
import nexaHeavy from "../../styles/type/nexaHeavy";
import { maxContentWidth } from "../../styles/layout";
import { offscreen as a11yOffscreen } from "../../styles/a11y";
import { header as headerZIndex } from "../../styles/zIndex";
import { verticalOffset, logoHeight } from "./common";

const multiLine = "@media (max-width: 30rem)";

export const root = css({
    position: "sticky",
    top: 0,
    zIndex: headerZIndex,
    color: black(),
    backgroundColor: white(),
    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
});

export const content = css({
    display: "flex",
    alignItems: "center",
    lineHeight: logoHeight + "px",
    flexWrap: "wrap",
    padding: [
        px(6) + verticalOffset,
        "px ",
        px(6),
        "px ",
        px(6) - verticalOffset,
        "px",
    ].join(""),
    maxWidth: maxContentWidth,
    marginLeft: "auto",
    marginRight: "auto",
});

export const logo = css({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "currentColor",
});

export const nav = css({
    marginLeft: rem(12) + "rem",
    [multiLine]: {
        marginLeft: 0,
        width: "100%",
        order: 1,
    },
});

export const session = css({
    marginLeft: "auto",
});

export const headline = css({
    ...nexaHeavy,
    fontSize: rem(13) + "rem",
    margin: 0,
    marginLeft: px(10),
});

export const offscreen = css(a11yOffscreen);
