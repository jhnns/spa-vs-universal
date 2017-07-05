import { css } from "glamor";
import { rem } from "../../styles/scales";
import { mint } from "../../styles/colors";
import { regularFontSize, regularLineHeight } from "../../styles/typoSizes";
import nexaXBold from "../../styles/type/nexaXBold";
import { regular } from "../borders";
import { repeatingLinear } from "../gradients";

const stripeColor = "rgba(0, 0, 0, 0.1)";
const stripeAnimation = css.keyframes({
    from: {
        backgroundPosition: "0 0",
    },
    to: {
        backgroundPosition: "71px 0px",
    },
});
// Mobile safari adds weird styles
const mobileSafariStyleFixes = {
    "-webkit-appearance": "none",
    borderRadius: 0,
};

export default {
    ...nexaXBold,
    ...mobileSafariStyleFixes,
    width: "100%",
    fontSize: regularFontSize + "rem",
    lineHeight: regularLineHeight + "rem",
    padding: rem(7) + "rem 0",
    border: "none",
    outline: "none",
    backgroundColor: mint(),
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0.3)",
    transition: "box-shadow 0.1s ease-in-out",
    ":hover": {
        cursor: "pointer",
        boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.2), -3px 3px 3px rgba(0, 0, 0, 0.2)",
    },
    ":focus": {
        outline: regular(),
    },
    "[data-pending]": {
        backgroundImage: repeatingLinear("-45deg", [
            "transparent 0",
            "transparent 25px",
            stripeColor + " 25px",
            stripeColor + " 50px",
        ]),
        backgroundSize: "71px 50px",
        animation: stripeAnimation + " 2s linear infinite",
    },
};
