import path from "path";
// import ExtractTextPlugin from "extract-text-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";
import reg from "readable-regex";
import nodeExternals from "webpack-node-externals";
import WriteStatsPlugin from "../tools/webpack/WriteStatsPlugin";
import serverConfig from "./server";

const projectRoot = path.resolve(__dirname, "..");
const env = process.env.WEBPACK_ENV || "development";
const target = process.env.WEBPACK_TARGET || "browser";
const isBrowser = target === "browser";
const isNode = target === "node";
const isAnalysis = env === "analysis";
const isProd = isAnalysis || env === "production";
const isDev = isProd === false;
const modulesWithDebugAssertions = ["nanorouter", "nanohref", "nanohistory", "wayfarer"];
const outputFilenamePattern = `[name].${ isBrowser ? "[chunkhash]." : "" }js`;

export default {
    bail: isProd,
    target: isNode ? "node" : "web",
    entry: clean({
        client: isBrowser ? require.resolve(projectRoot + "/app/client") : null,
        server: isNode ? require.resolve(projectRoot + "/app/server") : null,
    }),
    output: clean({
        path: isNode ? path.resolve(projectRoot + "/dist/app") : path.resolve(projectRoot + "/dist/public"),
        filename: outputFilenamePattern,
        chunkFilename: outputFilenamePattern,
        libraryTarget: isNode ? "commonjs2" : null,
    }),
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
            isNode && {
                test: path.resolve(projectRoot, "app", "index.html"),
                loader: "ejs-compiled-loader",
            },
        ]),
    },
    plugins: clean([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env),
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: isProd,
            debug: isDev,
        }),
        isBrowser && new WriteStatsPlugin(),
        // isBrowser &&
        //     new ExtractTextPlugin({
        //         filename: "[name].[contenthash].css",
        //         allChunks: true,
        //         disable: isDev,
        //     }),
        isBrowser &&
            new webpack.optimize.CommonsChunkPlugin({
                name: "app",
                async: "common",
                minChunks: 3,
            }),
        isAnalysis &&
            isBrowser &&
            new BundleAnalyzerPlugin({
                analyzerHost: "127.0.0.1",
                analyzerPort: 8081,
                openAnalyzer: false,
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
    watchOptions: {
        aggregateTimeout: isNode ? 300 : 1000,
    },
    devServer: {
        contentBase: path.join(projectRoot, "public"),
        inline: true,
        historyApiFallback: true,
        proxy: {
            "/": `http://${ serverConfig.hostname }:${ serverConfig.port }/`,
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
