import cxs from "cxs";
import { px } from "../../styles/scales";
import { offscreen } from "../../styles/a11y";
import { maxContentWidth } from "../../styles/layout";

export const main = cxs({
    maxWidth: maxContentWidth,
    marginLeft: "auto",
    marginRight: "auto",
    ["@media (min-width: " + px(14) * 20 + "px)"]: {
        padding: px(14),
    },
});

export const headline = cxs({
    ...offscreen,
});

export const postsContainer = cxs({
    display: "flex",
    flexDirection: "column",
    "> *:nth-child(odd)": {
        alignSelf: "flex-end",
    },
});
