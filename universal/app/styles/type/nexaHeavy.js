import { css } from "glamor";
import woff2 from "../../assets/fonts/nexaHeavyWebfont.woff2";
import woff from "../../assets/fonts/nexaHeavyWebfont.woff";
import ttf from "../../assets/fonts/nexaHeavyWebfont.ttf";

const fontStyles = {
    fontWeight: 900,
    fontStyle: "normal",
};

const fontFamily = css.fontFace({
    fontFamily: "Nexa",
    ...fontStyles,
    src: `local("Nexa Heavy"),
       url("${ woff2 }") format("woff2"),
       url("${ woff }") format("woff"),
       url("${ ttf }") format("truetype")`,
});

export default {
    fontFamily,
    ...fontStyles,
};
