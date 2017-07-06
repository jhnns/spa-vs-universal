import fs from "fs";
import { assetsJson as pathToAssetJson } from "../../app/server/paths";

export default class WriteAssetsJsonPlugin {
    apply(compiler) {
        compiler.plugin("after-emit", (compilation, done) => {
            const stats = compilation.getStats().toJson();
            const assets = stats.assets.map(asset => asset.name);

            fs.writeFile(pathToAssetJson, JSON.stringify(assets), done);
        });
    }
}
