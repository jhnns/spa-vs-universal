import { css } from "glamor";
import { px, rem } from "../../styles/scales";
import { offscreen } from "../../styles/a11y";
import { regularMaxWidth } from "../../styles/typoSizes";
import sheet, { sheetPadding } from "../../styles/block/sheet";
import attrSelector from "../util/attrSelector";

export const root = css({
    position: "relative",
});

export const a11yTitle = css({
    ...offscreen,
});

export const postImage = css({
    position: "absolute",
    maxWidth: px(30),
    marginTop: sheetPadding,
    transform: "translate(0%)",
    transition: "transform 0.3s ease-in-out",
});

export const postSheet = css({
    ...sheet,
    // position relative is necessary so that the position absolute image is still below the sheet
    position: "relative",
    maxWidth: regularMaxWidth + "rem",
});

export const postContainer = css({
    position: "relative",
    overflow: "hidden",
    ":not(:last-child)": {
        marginBottom: rem(15) + "rem",
    },
    [":nth-child(odd) " + attrSelector(postSheet)]: {
        marginLeft: "auto",
    },
    [":nth-child(odd) " + attrSelector(postImage)]: {
        left: px(17),
    },
    [":nth-child(even) " + attrSelector(postImage)]: {
        right: px(17),
    },
    [":nth-child(odd):not(:hover) " + attrSelector(postImage)]: {
        transform: "translate(10%)",
    },
    [":nth-child(even):not(:hover) " + attrSelector(postImage)]: {
        transform: "translate(-10%)",
    },
});
