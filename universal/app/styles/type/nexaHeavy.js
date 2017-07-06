import { css } from "glamor";
import woff2 from "../../assets/fonts/nexaHeavyWebfont.woff2";
import woff from "../../assets/fonts/nexaHeavyWebfont.woff";
import ttf from "../../assets/fonts/nexaHeavyWebfont.ttf";

export default css.fontFace({
    fontFamily: "Nexa",
    src: `local("Nexa Heavy"),
       url("${ woff2 }") format("woff2"),
       url("${ woff }") format("woff"),
       url("${ ttf }") format("truetype")`,
    fontWeight: 900,
    fontStyle: "normal",
});
