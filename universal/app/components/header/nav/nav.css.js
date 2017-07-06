import { css } from "glamor";
import { px } from "../../../styles/scales";

export const list = css({
    display: "flex",
    listStyleType: "none",
});

export const listItem = css({
    ":not(:last-child)": {
        marginRight: px(10),
    },
});
