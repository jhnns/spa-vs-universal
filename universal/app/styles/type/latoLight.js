import { css } from "glamor";
import woff2 from "../../assets/fonts/latoLatinLight.woff2";
import woff from "../../assets/fonts/latoLatinLight.woff";
import ttf from "../../assets/fonts/latoLatinLight.ttf";

const fontStyles = {
    fontWeight: 200,
    fontStyle: "normal",
};

const fontFamily = css.fontFace({
    fontFamily: "Lato",
    ...fontStyles,
    src: `local("Lato Light"),
       url("${ woff2 }") format("woff2"),
       url("${ woff }") format("woff"),
       url("${ ttf }") format("truetype")`,
});

export default {
    fontFamily,
    ...fontStyles,
};

