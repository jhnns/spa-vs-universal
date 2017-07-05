import { css } from "glamor";
import { px } from "../../../../styles/scales";
import latoLight from "../../../../styles/type/latoLight";
import { headerCollapseBreakpoint, logoHeight, verticalOffset } from "../../common";
import { regularFontSize } from "../../../../styles/typoSizes";

export const root = css({
    display: "flex",
    alignItems: "center",
    fontSize: regularFontSize + "rem",
    // Avoids jumping header when the session state has changed
    lineHeight: 0,
    "> *:not(:last-child)": {
        marginRight: px(10),
    },
});

export const userName = css({
    ...latoLight,
    position: "relative",
    top: -verticalOffset,
    [headerCollapseBreakpoint]: {
        display: "none",
    },
});

export const userImage = css({
    position: "relative",
    top: -verticalOffset,
    display: "block",
    height: logoHeight + "rem",
    borderRadius: "100%",
});
