import { css } from "glamor";
import { px, rem } from "../../../styles/scales";
import { offscreen } from "../../../styles/a11y";
import { maxContentWidth } from "../../../styles/layout";
import { white, black } from "../../../styles/colors";
import { regularMaxWidth } from "../../../styles/typoSizes";

const sheetPadding = px(13);

export const main = css({
    maxWidth: maxContentWidth,
    marginLeft: "auto",
    marginRight: "auto",
    ["@media (min-width: " + px(14) * 20 + "px)"]: {
        padding: px(14),
    },
});

export const headline = css({
    ...offscreen,
});

export const postImage = css({
    position: "absolute",
    maxWidth: px(30),
    marginTop: sheetPadding,
    transform: "translate(0%)",
    transition: "transform 0.3s ease-in-out",
});

export const postsContainer = css({
    position: "relative",
});

export const sheet = css({
    // position relative is necessary so that the position absolute image is still below the sheet
    position: "relative",
    color: black(),
    backgroundColor: white(),
    padding: sheetPadding,
    maxWidth: regularMaxWidth + "rem",
});

export const postContainer = css({
    position: "relative",
    overflow: "hidden",
    ":not(:last-child)": {
        marginBottom: rem(15) + "rem",
    },
    [":nth-child(odd) ." + sheet]: {
        marginLeft: "auto",
    },
    [":nth-child(odd) ." + postImage]: {
        left: px(17),
    },
    [":nth-child(even) ." + postImage]: {
        right: px(17),
    },
    [":nth-child(odd):not(:hover) ." + postImage]: {
        transform: "translate(10%)",
    },
    [":nth-child(even):not(:hover) ." + postImage]: {
        transform: "translate(-10%)",
    },
});
