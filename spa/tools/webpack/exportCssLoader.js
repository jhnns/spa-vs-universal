const exportCss = `module.exports = ((cxs, oldExports) => {
    const newExports = [[module.id, cxs.getCss()]];

    Object.assign(newExports, oldExports);

    newExports.locals = oldExports;
    cxs.reset();

    return newExports;
})(require("cxs"), module.exports);`;

module.exports = function (source, sourceMaps) {
    this.callback(null, source + ";" + exportCss, sourceMaps);
};
