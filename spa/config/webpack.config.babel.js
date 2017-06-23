import path from "path";
import HtmlPlugin from "html-webpack-plugin";
import CleanPlugin from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";

const projectRoot = path.resolve(__dirname, "..");
const env = process.env.WEBPACK_ENV || "development";
const isProd = env === "production";
const isDev = isProd === false;

export default {
    bail: isProd,
    entry: {
        app: require.resolve(projectRoot + "/client"),
    },
    output: {
        path: path.resolve(projectRoot, "public"),
        filename: "[name].bundle.js",
    },
    resolve: {
        alias: {
            cxs: "cxs/monolithic",
        },
    },
    module: {
        // See https://github.com/webpack/webpack/pull/4348
        strictExportPresence: isProd,
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(projectRoot, "node_modules"),
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
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
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
        ],
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
