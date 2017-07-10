import fs from "fs";
import { assetsJson as pathToAssetJson } from "../../app/server/paths";

export default class WriteAssetsJsonPlugin {
    apply(compiler) {
        compiler.plugin("after-emit", (compilation, done) => {
            const publicPath = compiler.options.output.publicPath || "/";
            const stats = compilation.getStats().toJson();
            const assets = stats.entrypoints.client.assets.map(asset => publicPath + asset);

            fs.writeFile(pathToAssetJson, JSON.stringify(assets), done);
        });
    }
}
