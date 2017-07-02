import { css } from "glamor";
import { modal as modalZIndex } from "../../../styles/zIndex";
import { msToSeconds } from "../../../styles/timing";

export const fadeDuration = 100;
const fadeDurationCss = msToSeconds(fadeDuration) + "s";

export const backdrop = css({
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: modalZIndex,
    overflow: "hidden",
});

export const backdropHidden = css({
    width: 0,
    height: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: `background-color ${ fadeDurationCss } ease-in-out, width 0s ${ fadeDurationCss }, height 0s ${ fadeDurationCss }`,
});

export const backdropVisible = css({
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    transition: `background-color ${ fadeDurationCss } ease-in-out`,
});
