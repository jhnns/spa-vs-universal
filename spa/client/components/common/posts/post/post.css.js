import { css } from "glamor";
import nexaHeavy from "../../../../styles/type/nexaHeavy";
import latoLight from "../../../../styles/type/latoLight";
import { rem } from "../../../../styles/scales";
import {
    regular,
    regularLineHeight,
    regularMaxWidth,
} from "../../../../styles/typoSizes";

export const headline = css({
    ...nexaHeavy,
    maxWidth: rem(30) + "rem",
    marginBottom: rem(7) + "rem",
});

export const meta = css({
    ...latoLight,
    display: "block",
    fontSize: rem(11) + "rem",
    lineHeight: rem(10) + "rem",
    marginBottom: rem(13) + "rem",
});

export const paragraph = css({
    ...latoLight,
    fontSize: regular + "rem",
    lineHeight: regularLineHeight + "rem",
    maxWidth: regularMaxWidth + "rem",
    ":not(:last-child)": {
        marginBottom: rem(10) + "rem",
    },
});
