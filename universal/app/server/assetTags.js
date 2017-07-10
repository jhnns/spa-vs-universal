import fs from "fs";
import path from "path";
import { isProd } from "../env";
import { assetsJson as pathToAssetsJson } from "./paths";

const assetTags = isProd === true ? prepareAssetTags() : null;

function prepareAssetTags() {
    return JSON.parse(fs.readFileSync(pathToAssetsJson, "utf8"))
        .map(asset => asset.replace(/\.gz$/, ""))
        .map(asset => {
            if (/\.js$/.test(asset) === true) {
                return `<script src="${ asset }" defer></script>`;
            }
            if (/\.css$/.test(asset) === true) {
                return `<link href="${ asset }" type="text/css" rel="stylesheet" />`;
            }

            return "";
        })
        .reduce((str, tag) => str + tag, "");
}

export default function get() {
    return assetTags === null ? prepareAssetTags() : assetTags;
}
