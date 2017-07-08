import path from "path";

const pathToEffects = path.resolve(__dirname, "..", "..", "app", "effects");
const pathToEffectsRegistry = require.resolve(pathToEffects, "registry");

module.exports = function (source, sourceMaps) {
    this.callback(null, source + `;import "../${ process.env.WEBPACK_TARGET }";`, sourceMaps);
};
