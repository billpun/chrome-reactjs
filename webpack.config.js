const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = '/';

const config = {
    entry: {
        popup: [path.join(__dirname, "src/popup.tsx")],
        content: [path.join(__dirname, "src/content.tsx")],
        background: path.join(__dirname, "src/background.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "static/js/[name].js",
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
                exclude: /\.module\.s?css$/,
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    "sass-loader"
                ],
                include: /\.module\.s?css$/,
            },
            {
                test: /\.svg$/,
                use: "file-loader",
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            mimetype: "image/png",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    devServer: {
        contentBase: "./dist",
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "." }],
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css'
        }),
    ],
};

module.exports = config;
