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
    marginBottom: rem(15) + "rem",
    color: black(),
    backgroundColor: white(),
    padding: px(13),
});

export const headline = cxs({
    ...nexaHeavy,
    maxWidth: rem(30) + "rem",
    marginBottom: rem(10) + "rem",
});

export const paragraph = cxs({
    ...latoLight,
    marginBottom: rem(7) + "rem",
    fontSize: regular + "rem",
    lineHeight: regularLineHeight + "rem",
    maxWidth: regularMaxWidth + "rem",
});
