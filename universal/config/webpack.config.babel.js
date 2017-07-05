import path from "path";
// import HtmlPlugin from "html-webpack-plugin";
import CleanPlugin from "clean-webpack-plugin";
// import CopyPlugin from "copy-webpack-plugin";
// import ExtractTextPlugin from "extract-text-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";
import reg from "readable-regex";
import nodeExternals from "webpack-node-externals";
import serverConfig from "./server";
// import InlinePreStylesPlugin from "../tools/webpack/InlinePreStylesPlugin";

const projectRoot = path.resolve(__dirname, "..");
const env = process.env.WEBPACK_ENV || "development";
const target = process.env.WEBPACK_TARGET || "browser";
const isBrowser = target === "browser";
const isNode = target === "node";
const isAnalysis = env === "analysis";
const isProd = isAnalysis || env === "production";
const isDev = isProd === false;
const modulesWithDebugAssertions = ["nanorouter", "nanohref", "nanohistory", "wayfarer"];

export default {
    bail: isProd,
    entry: {
        app: isNode ? require.resolve(projectRoot + "/app/server") : require.resolve(projectRoot + "/app/client"),
    },
    output: {
        path: isNode ? require.resolve(projectRoot + "/dist/bundle") : require.resolve(projectRoot + "/public"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
    },
    module: {
        // See https://github.com/webpack/webpack/pull/4348
        strictExportPresence: isProd,
        rules: clean([
            {
                test: /\.js$/,
                exclude: clean([path.resolve(projectRoot, "node_modules")]),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            forceEnv: isNode ? "development" : "browser",
                        },
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
                            emitFile: isBrowser,
                        },
                    },
                ],
            },
            isProd &&
            isBrowser && {
                test: /\.(jpe?g|gif|png|svg)$/,
                use: [
                    {
                        loader: "image-webpack-loader",
                    },
                ],
            },
            isProd && {
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
        isBrowser &&
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
        // isBrowser && new CopyPlugin([
        //     {
        //         from: path.resolve(projectRoot, "client", "assets", "public"),
        //         to: path.resolve(projectRoot, "public"),
        //     },
        // ]),
        isAnalysis &&
            isBrowser &&
            new BundleAnalyzerPlugin({
                analyzerHost: "127.0.0.1",
                analyzerPort: 8081,
                openAnalyzer: false,
            }),
        isProd &&
            isBrowser &&
            new CleanPlugin(["public/*.*"], {
                root: projectRoot,
                verbose: false,
            }),
        isProd &&
            isBrowser &&
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
            isBrowser &&
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
        isProd && isBrowser && new webpack.optimize.ModuleConcatenationPlugin(),
        isProd && isBrowser && new webpack.HashedModuleIdsPlugin(),
    ]),
    node: isBrowser ?
        {
            fs: "empty",
            net: "empty",
            tls: "empty",
        } :
        {},
    externals: clean([isNode && nodeExternals()]),
    performance: {
        hints: isProd && isBrowser ? "warning" : false,
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
