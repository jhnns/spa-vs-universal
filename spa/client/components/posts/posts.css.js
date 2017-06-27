import cxs from "cxs";
import { px } from "../../styles/scales";
import { offscreen } from "../../styles/a11y";
import { maxContentWidth } from "../../styles/layout";

export const main = cxs({
    padding: px(14),
    maxWidth: maxContentWidth,
    marginLeft: "auto",
    marginRight: "auto",
});

export const headline = cxs({
    ...offscreen,
});
