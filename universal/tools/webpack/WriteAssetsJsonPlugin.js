import fs from "fs";
import { assetsJson as pathToAssetJson } from "../../app/server/paths";

export default class WriteAssetsJsonPlugin {
    apply(compiler) {
        compiler.plugin("after-emit", (compilation, done) => {
            const publicPath = compiler.options.output.publicPath || "/";
            const stats = compilation.getStats().toJson();
            const assets = stats.chunks.reduce((assets, chunk) => {
                assets[chunk.names[0]] = chunk.files.map(file => publicPath + file);

                return assets;
            }, {});

            fs.writeFile(pathToAssetJson, JSON.stringify(assets), done);
        });
    }
}
