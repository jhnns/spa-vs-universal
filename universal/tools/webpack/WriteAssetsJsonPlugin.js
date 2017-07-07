import fs from "fs";
import { assetsJson as pathToAssetJson } from "../../app/server/paths";

export default class WriteAssetsJsonPlugin {
    apply(compiler) {
        compiler.plugin("after-emit", (compilation, done) => {
            const stats = compilation.getStats().toJson();

            fs.writeFile(pathToAssetJson, JSON.stringify(stats.entrypoints.client.assets), done);
        });
    }
}
