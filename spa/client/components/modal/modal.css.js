import { css } from "glamor";
import { modal as modalZIndex } from "../../styles/zIndex";
import { msToSeconds } from "../../styles/timing";

export const fadeDuration = 100;
const fadeDurationCss = msToSeconds(fadeDuration) + "s";
const backdropOpacity = 0.4;

export const backdrop = css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: modalZIndex,
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
