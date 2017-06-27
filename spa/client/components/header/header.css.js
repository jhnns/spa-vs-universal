import cxs from "cxs";
import { white, black } from "../../styles/colors";
import { px, rem } from "../../styles/scales";
import nexaXBold from "../../styles/type/nexaXBold";
import { offscreen as a11yOffscreen } from "../../styles/a11y";
import { verticalOffset } from "./common";

export const root = cxs({
    position: "sticky",
    display: "flex",
    alignItems: "center",
    color: black(),
    backgroundColor: white(),
    padding: [
        px(6) + verticalOffset,
        "px ",
        px(6),
        "px ",
        px(6) - verticalOffset,
        "px",
    ].join(""),
    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
});

export const logo = cxs({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
});

export const headline = cxs({
    ...nexaXBold,
    position: "relative",
    top: 2,
    fontSize: rem(3) + "rem",
    margin: 0,
    marginLeft: px(8),
});

export const offscreen = cxs(a11yOffscreen);
