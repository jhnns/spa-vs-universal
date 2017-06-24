import cxs from "cxs";
import { white, black } from "../../styles/colors";
import { px } from "../../styles/scales";
import nexaHeavy from "../../styles/type/nexaHeavy";
import { offscreen as a11yOffscreen } from "../../styles/a11y";
import { baseLine } from "./common";

export const root = cxs({
    position: "sticky",
    display: "flex",
    alignItems: "center",
    color: black(),
    backgroundColor: white(),
    padding: px(6),
    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
    lineHeight: baseLine + "rem",
});

export const logo = cxs({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
});

export const headline = cxs({
    ...nexaHeavy,
    fontSize: baseLine + "rem",
    margin: 0,
    marginLeft: px(8),
});

export const offscreen = cxs(a11yOffscreen);
