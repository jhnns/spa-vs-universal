import cxs from "cxs";
import { white, black } from "../../styles/colors";
import { px, rem } from "../../styles/scales";
import nexaHeavy from "../../styles/type/nexaHeavy";
import { offscreen as a11yOffscreen } from "../../styles/a11y";

export const root = cxs({
    position: "sticky",
    color: black(),
    backgroundColor: white(),
    padding: px(6),
    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
});

export const logo = cxs({
    display: "flex",
    alignItems: "center",
});

export const headline = cxs({
    ...nexaHeavy,
    fontSize: rem(3) + "rem",
    margin: 0,
    marginLeft: px(5),
});

export const offscreen = cxs(a11yOffscreen);
