const exportCss = `module.exports = ((cxs, locals) => {
    const e = [[module.id, cxs.getCss()]];

    e.locals = locals;
    cxs.reset();

    return e;
})(require("cxs"), module.exports);`;

module.exports = function (source, sourceMaps) {
    this.callback(null, source + ";" + exportCss, sourceMaps);
};
