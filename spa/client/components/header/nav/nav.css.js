import cxs from "cxs";
import { px } from "../../../styles/scales";

export const list = cxs({
    display: "flex",
    listStyleType: "none",
});

export const listItem = cxs({
    ":not(:last-child)": {
        marginRight: px(10),
    },
});
