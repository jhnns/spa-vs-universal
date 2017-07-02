import { css } from "glamor";
import { verticalOffset, logoHeight } from "../common";

export const logoImg = css({
    position: "relative",
    display: "block",
    width: logoHeight,
    top: -verticalOffset,
});
