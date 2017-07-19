import { css } from "glamor";
import { px } from "../../../../styles/scales";
import latoLight from "../../../../styles/type/latoLight";
import { headerCollapseBreakpoint, logoHeight } from "../../common";
import { regularFontSize } from "../../../../styles/typoSizes";

export const root = css({
    display: "flex",
    alignItems: "center",
    fontSize: regularFontSize + "rem",
    "> *:not(:last-child)": {
        marginRight: px(10),
    },
});

export const userName = css({
    ...latoLight,
    [headerCollapseBreakpoint]: {
        display: "none",
    },
});

export const userImage = css({
    display: "block",
    height: logoHeight + "rem",
    borderRadius: "100%",
});
