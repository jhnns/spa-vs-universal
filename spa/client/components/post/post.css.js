import cxs from "cxs";
import nexaHeavy from "../../styles/type/nexaHeavy";
import latoLight from "../../styles/type/latoLight";
import { px, rem } from "../../styles/scales";
import { white, black } from "../../styles/colors";
import {
    regular,
    regularLineHeight,
    regularMaxWidth,
} from "../../styles/typoSizes";

export const root = cxs({
    color: black(),
    backgroundColor: white(),
    padding: px(13),
    maxWidth: regularMaxWidth + "rem",
    ":not(:last-child)": {
        marginBottom: rem(15) + "rem",
    },
});

export const headline = cxs({
    ...nexaHeavy,
    maxWidth: rem(30) + "rem",
    marginBottom: rem(10) + "rem",
});

export const paragraph = cxs({
    ...latoLight,
    fontSize: regular + "rem",
    lineHeight: regularLineHeight + "rem",
    maxWidth: regularMaxWidth + "rem",
    ":not(:last-child)": {
        marginBottom: rem(10) + "rem",
    },
});
