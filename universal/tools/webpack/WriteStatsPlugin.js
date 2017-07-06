import fs from "fs";
import path from "path";

const statsKeys = ["hash", "publicPath", "assetsByChunkName"];

export default class WriteStatsPlugin {
    constructor(statsOptions = {}) {
        this.statsOptions = statsOptions;
    }
    apply(compiler) {
        compiler.plugin("emit", (compilation, done) => {
            const stats = compilation.getStats().toJson(this.statsOptions);
            const filteredStats = {};

            Object.keys(stats)
                .filter(key => statsKeys.indexOf(key) > -1)
                .forEach(key => (filteredStats[key] = stats[key]));

            fs.writeFile(
                path.resolve(compilation.options.output.path, "stats.json"),
                JSON.stringify(filteredStats),
                done
            );
        });
    }
}
