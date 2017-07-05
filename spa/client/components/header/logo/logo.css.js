import { css } from "glamor";
import { verticalOffset, logoHeight } from "../common";

export const logoImg = css({
    position: "relative",
    display: "block",
    height: logoHeight + "rem",
    top: -verticalOffset,
});
