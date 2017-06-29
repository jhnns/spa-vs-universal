import { css } from "glamor";
import { px } from "../../../styles/scales";
import { verticalOffset } from "../common";

export const logoImg = css({
    position: "relative",
    display: "block",
    width: px(17),
    top: -verticalOffset,
});
