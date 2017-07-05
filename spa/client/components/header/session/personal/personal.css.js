import { css } from "glamor";
import { white, black } from "../../../../styles/colors";
import { px, rem } from "../../../../styles/scales";
import nexaHeavy from "../../../../styles/type/nexaHeavy";
import latoLight from "../../../../styles/type/latoLight";
import {
    regularFontSize,
    regularLineHeight,
} from "../../../../styles/typoSizes";

export const root = css({
    display: "flex",
    alignItems: "baseline",
    "> *:not(:last-child)": {
        marginRight: px(10),
    },
});

export const userName = css({
    ...latoLight,
    fontSize: regularFontSize + "rem",
    lineHeight: regularLineHeight + "rem",
});

export const userImage = css({
    height: px(16),
    borderRadius: "100%",
    alignSelf: "center",
});

export const logoutLink = css({
    ...nexaHeavy,
});
