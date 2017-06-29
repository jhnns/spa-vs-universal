const exportCss = `module.exports = (({ renderStatic }, oldExports) => {
    const oldKeys = Object.keys(oldExports);
    const locals = {};
    const { css } = renderStatic(() => {
        oldKeys.forEach(key => {
            const exportValue = oldExports[key];

            if (exportValue !== undefined && exportValue !== null) {
                locals[key] = exportValue.toString();
            }
        });

        return "";
    });
    const newExports = [[module.id, css]];

    Object.assign(newExports, oldExports);
    newExports.locals = locals;

    return newExports;
})(require("glamor/server"), module.exports);`;

module.exports = function (source, sourceMaps) {
    this.callback(null, source + ";" + exportCss, sourceMaps);
};
