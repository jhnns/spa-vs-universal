import cxs from "cxs";
import { mintLight35, silverLight10 } from "../../styles/colors";
import { linear } from "../../styles/gradient";
import { px } from "../../styles/scales";

export const root = cxs({
    margin: 0,
    backgroundImage: linear("to bottom", [
        silverLight10(),
        mintLight35() + ` ${ px(40) }px`,
    ]),
    minHeight: "100%",
});
