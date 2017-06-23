import path from "path";
import HtmlPlugin from "html-webpack-plugin";

const projectRoot = path.resolve(__dirname, "..");

export default {
    entry: require.resolve(projectRoot + "/client"),
    output: {
        path: path.resolve(projectRoot, "public"),
    },
    resolve: {
        alias: {
            cxs: "cxs/monolithic",
        },
    },
    module: {
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
    plugins: [
        new HtmlPlugin({
            template: require.resolve(projectRoot + "/public/index.html"),
        }),
    ],
    devtool: "source-map",
    devServer: {
        contentBase: path.join(projectRoot, "public"),
        inline: true,
        proxy: {
            "/api": "http://localhost:8080/api",
        },
    },
};
