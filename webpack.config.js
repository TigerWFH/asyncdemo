// libs
const path = require('path');
const webpack = require('webpack');

// plugins
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV === "development" ? "development" : "production";
var sourcePath = path.join(__dirname, 'app');
var buildPath = path.join(__dirname, 'static');


if (env === "production") {
    buildPath = path.join(__dirname, 'dist')
}

module.exports = {
    entry: path.join(sourcePath, 'main.tsx'),
    output: {
        path: buildPath,
        filename: "bundles/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [sourcePath],
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.less$/,
                include: [sourcePath],
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {

                            }
                        },
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(jpg|jpeg|png|gif)/,
                include: [path.join(sourcePath, 'common/images')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            sourcePath
        ],
        extensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".less", ".scss", ".json"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(env)
        }),
        new ExtractTextWebpackPlugin("css/index.css"),
        new HtmlWebpackPlugin({
            title: "AsyncDemo-Monkey",
            template: path.join(sourcePath, "index.html")
        })
    ],
    target: "web",
    devServer: {
        contentBase: buildPath,
        host: '0.0.0.0',
        port: 8080,
        compress: true,
        watchContentBase: true,
        hot: true,
        noInfo: true,
        quiet: true,
        proxy: {
            "/v1": "http://locahost:9000"
        }
    }
}