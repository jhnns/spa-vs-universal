import { css } from "glamor";
import woff2 from "../../assets/fonts/nexaExtraboldWebfont.woff2";
import woff from "../../assets/fonts/nexaExtraboldWebfont.woff";
import ttf from "../../assets/fonts/nexaExtraboldWebfont.ttf";

const fontStyles = {
    fontWeight: 700,
    fontStyle: "normal",
};

const fontFamily = css.fontFace({
    fontFamily: "Nexa",
    ...fontStyles,
    src: `local("Nexa XBold"),
       url("${ woff2 }") format("woff2"),
       url("${ woff }") format("woff"),
       url("${ ttf }") format("truetype")`,
});

export default {
    fontFamily,
    ...fontStyles,
};
