const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{from: 'static/'}],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        }),
        new WebpackCdnPlugin({
            prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path',
            modules: [
                {
                    name: "jquery",
                    path: 'dist/jquery.min.js'
                }, {
                    name: "bootstrap",
                    paths: [
                        'dist/js/bootstrap.bundle.min.js',
                        'dist/js/bootstrap.min.js',
                    ],
                    style: 'dist/css/bootstrap.min.css'
                }, {
                    name: "bootstrap-select",
                    paths: [
                        'dist/js/bootstrap-select.min.js',
                        'dist/js/i18n/defaults-zh_CN.min.js',
                    ],
                    style: 'dist/css/bootstrap-select.min.css'
                }, {
                    name: "bootstrap-table",
                    path: "dist/bootstrap-table.min.js",
                    style: "dist/bootstrap-table.min.css"
                }, {
                    name: "toastr",
                    path: "build/toastr.min.js",
                    style: "build/toastr.min.css"
                }
            ]
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ]
};

module.exports = config;
