import { css } from "glamor";
import { modal as modalZIndex } from "../../../styles/zIndex";
import { msToSeconds } from "../../../styles/timing";

const backdropFadeOutStyles = {
    backgroundColor: "rgba(0, 0, 0, 0)",
};
const backdropFadeInStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
};

const fadeIn = css.keyframes({
    from: backdropFadeOutStyles,
    to: backdropFadeInStyles,
});

const fadeOut = css.keyframes({
    from: backdropFadeInStyles,
    to: backdropFadeOutStyles,
});

export const fadeDuration = 100;
const fadeDurationCss = msToSeconds(fadeDuration) + "s";

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
});

export const backdropFadeIn = css({
    animation: `${ fadeIn } ${ fadeDurationCss } ease-in-out forwards`,
});

export const backdropFadeOut = css({
    animation: `${ fadeOut } ${ fadeDurationCss } ease-in-out forwards`,
});
