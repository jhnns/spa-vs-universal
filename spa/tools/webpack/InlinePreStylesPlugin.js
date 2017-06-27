class InlinePreStylesPlugin {
    apply(compiler) {
        // Hook into the html-webpack-plugin processing
        compiler.plugin("compilation", compilation => {
            compilation.plugin(
                "html-webpack-plugin-alter-asset-tags",
                (htmlPluginData, callback) => {
                    const assets = compilation.assets;
                    const styleTags = Object.keys(assets)
                        .filter(file => /\.pre\.css$/.test(file) === true)
                        .map(file => assets[file].source().toString("utf8"))
                        .map(src => ({
                            tagName: "style",
                            closeTag: true,
                            attributes: {
                                type: "text/css",
                            },
                            innerHTML: src,
                        }));

                    htmlPluginData.head = htmlPluginData.head.concat(styleTags);

                    callback(null, htmlPluginData);
                }
            );
        });
    }
}

module.exports = InlinePreStylesPlugin;
