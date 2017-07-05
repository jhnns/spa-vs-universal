import path from "path";
import HtmlPlugin from "html-webpack-plugin";
import CleanPlugin from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";
import reg from "readable-regex";
import serverConfig from "./server";
import InlinePreStylesPlugin from "../tools/webpack/InlinePreStylesPlugin";

const projectRoot = path.resolve(__dirname, "..");
const env = process.env.WEBPACK_ENV || "development";
const isAnalysis = env === "analysis";
const isProd = isAnalysis || env === "production";
const isDev = isProd === false;
const cssJsModules = /\.css\.js$/;
const modulesWithDebugAssertions = ["nanorouter", "nanohref", "nanohistory", "wayfarer"];

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
    module: {
        // See https://github.com/webpack/webpack/pull/4348
        strictExportPresence: isProd,
        rules: clean([
            {
                test: /\.js$/,
                exclude: clean([path.resolve(projectRoot, "node_modules"), isProd && cssJsModules]),
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
                        loader: require.resolve("../tools/webpack/exportCssLoader"),
                    },
                ]),
            },
            {
                test: /\.css$/,
                // prettier-ignore
                // Prettier adds unnecessary escapes
                include: [
                    path.resolve(projectRoot, "client", "styles", "type", "fonts"),
                    path.resolve(projectRoot, "client", "styles", "pre"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].pre.css",
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg|ttf|woff2?)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            isProd && {
                test: /\.(jpe?g|gif|png|svg)$/,
                use: [
                    {
                        loader: "image-webpack-loader",
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
        ]),
    },
    plugins: clean([
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
        new InlinePreStylesPlugin(),
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
        isAnalysis &&
            new BundleAnalyzerPlugin({
                analyzerHost: "127.0.0.1",
                analyzerPort: 8081,
                openAnalyzer: false,
            }),
        isProd &&
            new CleanPlugin(["public/*.*"], {
                root: projectRoot,
                verbose: false,
            }),
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
        isProd &&
            isAnalysis === false &&
            new CompressionPlugin({
                test: {
                    // Fake RegExp
                    test(file) {
                        return /\.pre\.css$/.test(file) === false && /\.(js|css|svg)$/.test(file) === true;
                    },
                },
                deleteOriginalAssets: true,
            }),
        isProd && new webpack.optimize.ModuleConcatenationPlugin(),
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
            "/api": `http://${ serverConfig.hostname }:${ serverConfig.port }/`,
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
