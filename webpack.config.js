// libs
const path = require('path');
const webpack = require('webpack');

// plugins
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpacPlugin = require('clean-webpack-plugin');

var env = process.env.NODE_ENV === "development" ? "development" : "production";
var sourcePath = path.join(__dirname, 'app');
var buildPath = path.join(__dirname, 'build/static');


if (env === "production") {
    buildPath = path.join(__dirname, 'build/dist')
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
                include: [sourcePath, "node_modules/banner/src/modules"],
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.less$/,
                include: [sourcePath, "node_modules/banner/src/modules"],
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
                include: [path.join(sourcePath, 'common/images'), "node_modules/banner/src/modules"],
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
            template: path.join(sourcePath, "index.html"),
            // react: '<script src="https://cdn.bootcss.com/react/15.6.1/react.js"></script>',
            // reactDOM: '<script src="https://cdn.bootcss.com/react/15.6.1/react-dom.min.js"></script>'
        }),
        new CleanWebpacPlugin(["build"], {
            root: __dirname
        })
    ],
    target: "web",
    devServer: {
        contentBase: buildPath,
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