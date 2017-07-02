import { css } from "glamor";
import latoLight from "../../styles/type/latoLight";
import { rem } from "../../styles/scales";

export const root = css({
    ...latoLight,
    fontSize: rem(13) + "rem",
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: rem(20) + "rem",
    alignItems: "center",
    justifyContent: "center",
});
