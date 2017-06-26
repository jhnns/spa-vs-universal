import path from "path";
import HtmlPlugin from "html-webpack-plugin";
import PreloadWebpackPlugin from "preload-webpack-plugin";
import CleanPlugin from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";
import reg from "readable-regex";

const projectRoot = path.resolve(__dirname, "..");
const env = process.env.WEBPACK_ENV || "development";
const isProd = env === "production";
const isDev = isProd === false;
const cssJsModules = /\.css.js$/;
const modulesWithDebugAssertions = ["sheet-router", "wayfarer"];

export default {
    bail: isProd,
    entry: {
        app: require.resolve(projectRoot + "/client"),
    },
    output: {
        path: path.resolve(projectRoot, "public"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
    },
    resolve: {
        alias: {
            cxs: "cxs/monolithic",
        },
    },
    module: {
        // See https://github.com/webpack/webpack/pull/4348
        strictExportPresence: isProd,
        rules: clean([
            isProd && {
                test: cssJsModules,
                use: ExtractTextPlugin.extract([
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            forceEnv: "development",
                            sourceMaps: false,
                        },
                    },
                    {
                        loader: require.resolve(
                            "../tools/webpack/exportCssLoader"
                        ),
                    },
                ]),
            },
            {
                test: /\.js$/,
                exclude: clean([
                    path.resolve(projectRoot, "node_modules"),
                    isProd && cssJsModules,
                ]),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            forceEnv: "browser",
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                include: modulesWithDebugAssertions.map(moduleName =>
                    reg([
                        reg.charIn("/", "\\"),
                        "node_modules",
                        reg.charIn("/", "\\"),
                        moduleName,
                        reg.charIn("/", "\\"),
                    ])
                ),
                use: [
                    {
                        loader: "transform-loader?unassertify",
                    },
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ]),
    },
    plugins: clean([
        new CleanPlugin(["public"], {
            root: projectRoot,
            verbose: false,
        }),
        new HtmlPlugin({
            inject: "head",
            template: require.resolve(projectRoot + "/client/index.html"),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: isProd,
                minifyCSS: isProd,
                minifyURLs: isProd,
            },
        }),
        new PreloadWebpackPlugin({
            rel: "prefetch",
            as: "script",
        }),
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            allChunks: true,
            disable: isDev,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "app",
            async: "common",
            minChunks: 3,
        }),
        new webpack.ProvidePlugin({
            h: ["preact", "h"],
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env),
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: isProd,
            debug: isDev,
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env),
            },
        }),
        new CopyPlugin([
            {
                from: path.resolve(projectRoot, "client", "assets", "public"),
                to: path.resolve(projectRoot, "public"),
            },
        ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        isProd &&
            new webpack.optimize.UglifyJsPlugin({
                /* eslint-disable camelcase */
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true,
                },
                compress: {
                    screw_ie8: true,
                },
                comments: false,
                /* eslint-enable camelcase */
            }),
        isProd && new webpack.optimize.ModuleConcatenationPlugin(),
        process.stdout.isTTY &&
            isProd &&
            new BundleAnalyzerPlugin({
                analyzerHost: "127.0.0.1",
                analyzerPort: 8081,
                openAnalyzer: false,
            }),
        isProd && new webpack.HashedModuleIdsPlugin(),
    ]),
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
    },
    performance: {
        hints: isProd ? "warning" : false,
    },
    devtool: `${ isDev ? "eval-" : "" }source-map`,
    devServer: {
        contentBase: path.join(projectRoot, "public"),
        inline: true,
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:8080/api",
        },
    },
};

function clean(thing) {
    if (Array.isArray(thing)) {
        return thing.filter(v => Boolean(v));
    }

    return Object.keys(thing).reduce(
        (o, k) => (thing[k] == null ? o : ((o[k] = thing[k]), o)), // eslint-disable-line
        {}
    );
}
