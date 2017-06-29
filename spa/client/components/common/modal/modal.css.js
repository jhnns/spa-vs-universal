import { css } from "glamor";
import { modal as modalZIndex } from "../../../styles/zIndex";

const fadeIn = css.keyframes({
    from: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    to: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
});

export const root = css({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: modalZIndex,
});

export const backdrop = css({
    display: "block",
    width: "100%",
    height: "100%",
    animation: fadeIn + " 0.3s forwards ease-in-out",
});
