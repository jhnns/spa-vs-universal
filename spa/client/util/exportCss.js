/* eslint-disable import/unambiguous */
import cxs from "cxs";

export default function exportCss(m) {
    const e = [[m.id, cxs.getCss()]];

    e.locals = m.exports;
    cxs.reset();

    m.exports = e;
}

// module.exports = function exportCss(module) {
//     const cxs = require("cxs");
//     const e = [[module.id, cxs.getCss()]];

//     e.locals = module.exports;
//     cxs.reset();

//     return e;
// };

// module.exports = (locals => {
//     const cxs = require("cxs");
//     const e = [[module.id, cxs.getCss()]];

//     e.locals = locals;
//     cxs.reset();

//     return e;
// })(module.exports);
