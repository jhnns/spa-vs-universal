import { css } from "glamor";
import { modal as modalZIndex } from "../../styles/zIndex";
import { msToSeconds } from "../../styles/timing";
import { white } from "../../styles/colors";
import { documentPadding } from "../../styles/paddings";
import calc from "../../styles/calc";

export const fadeDuration = 100;
const fadeDurationCss = msToSeconds(fadeDuration) + "s";
const backdropOpacity = 0.4;

export const root = css({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: 0,
    width: "100%",
    zIndex: modalZIndex,
});

export const backdrop = css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
});

export const backdropHidden = css({
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: `background-color ${ fadeDurationCss } ease-in-out, transform 0s ${ fadeDurationCss }`,
    transform: "translateX(100%)",
});

export const backdropVisible = css({
    backgroundColor: `rgba(0, 0, 0, ${ backdropOpacity })`,
    transition: `background-color ${ fadeDurationCss } ease-in-out`,
});

export const window = css({
    backgroundColor: white(),
    maxWidth: calc("100vw - ", 2 + documentPadding, "px"),
    margin: "10vh auto",
    boxShadow: "0 7px 7px rgba(0, 0, 0, 0.3)",
});
