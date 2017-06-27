import cxs from "cxs";
import nexaHeavy from "../../styles/type/nexaHeavy";
import latoLight from "../../styles/type/latoLight";
import { rem } from "../../styles/scales";
import {
    regular,
    regularLineHeight,
    regularMaxWidth,
} from "../../styles/typoSizes";

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
