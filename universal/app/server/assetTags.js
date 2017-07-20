import fs from "fs";
import { isProd } from "../env";
import { assetsJson as pathToAssetsJson } from "./paths";

const assetTags = isProd === true ? prepareAssetTags() : null;

function prepareAssetTags() {
    const assetsJson = JSON.parse(fs.readFileSync(pathToAssetsJson, "utf8"));

    return Object.keys(assetsJson).reduce((assetTags, chunkName) => {
        const assets = assetsJson[chunkName];

        assetTags[chunkName] = assets
            .map(asset => asset.replace(/\.gz$/, ""))
            .map(asset => {
                if (/\.js$/.test(asset) === true) {
                    return `<script src="${ asset }" defer></script>`;
                }
                if (/\.css$/.test(asset) === true) {
                    return `<link href="${ asset }" type="text/css" rel="lazy-stylesheet" />`;
                }

                return "";
            })
            .join("");

        return assetTags;
    }, {});
}

export default function get(chunkName) {
    const tags = assetTags === null ? prepareAssetTags() : assetTags;
    const tag = tags[chunkName];

    if (typeof tag !== "string") {
        throw new Error(`No asset tag for chunk ${ chunkName }`);
    }

    return tag;
}
