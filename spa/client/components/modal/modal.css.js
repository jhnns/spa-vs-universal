import { css } from "glamor";
import hexToRgba from "hex-to-rgba";
import {
    backdrop as backdropZIndex,
    modal as modalZIndex,
} from "../../styles/zIndex";
import { msToSeconds } from "../../styles/timing";
import { white, mint } from "../../styles/colors";
import { paddingRegular } from "../../styles/paddings";
import calc from "../../styles/calc";

export const fadeDuration = 100;
const fadeDurationCss = msToSeconds(fadeDuration) + "s";
const backdropOpacity = 0.4;

const backdropGlowAnimation = css.keyframes({
    "50%": {
        backgroundColor: hexToRgba(mint(), "0.2"),
    },
});

export const root = css({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: 0,
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
});

export const backdrop = css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: backdropZIndex,
    backgroundColor: "black",
    ":focus": {
        animation: `${ backdropGlowAnimation } infinite 3s ease-in-out`,
    },
});

export const backdropHidden = css({
    opacity: 0,
    transition: `opacity ${ fadeDurationCss } ease-in-out, transform 0s ${ fadeDurationCss }`,
    transform: "translateX(100%)",
});

export const backdropVisible = css({
    opacity: backdropOpacity,
    transition: `opacity ${ fadeDurationCss } ease-in-out`,
});

export const window = css({
    position: "fixed",
    zIndex: modalZIndex,
    backgroundColor: white(),
    boxShadow: "0 7px 7px rgba(0, 0, 0, 0.3)",
    "> *": {
        width: calc("100vw - ", paddingRegular * 2, "px"),
    },
});
