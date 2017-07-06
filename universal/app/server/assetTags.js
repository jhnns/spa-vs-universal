import fs from "fs";
import path from "path";
import { isProd } from "../env";

const pathToStatsJson = path.resolve(process.cwd(), "dist", "public", "stats.json");
const cachedStats = readStats();

function readStats() {
    return JSON.parse(fs.readFileSync(pathToStatsJson, "utf8"));
}

export default function getAssetsTags() {
    const stats = isProd === true ? cachedStats : readStats();
    const assets = [].concat(stats.assetsByChunkName.client); // ensure Array

    return assets
        .map(asset => {
            if (/\.js(\.gz)?$/.test(asset) === true) {
                return `<script src=${ asset } defer></script>`;
            }
            if (/\.css(\.gz)?$/.test(asset) === true) {
                return `<link href=${ asset } type="text/css" rel="stylesheet" />`;
            }

            return "";
        })
        .reduce((str, tag) => str + tag, "");
}
