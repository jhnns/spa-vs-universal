import cxs from "cxs";
import { px } from "../../../styles/scales";
import { verticalOffset } from "../common";

export const logoImg = cxs({
    position: "relative",
    display: "block",
    width: px(17),
    top: -verticalOffset,
});
