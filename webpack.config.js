const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                // 遗留的js代码不过审，当作文件处理
                test: /legacy\/.*\.js$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }],
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /(node_modules|legacy)/
            },
            {
                test: /\.(htm|html)$/i,
                use: 'html-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    'svg-transform-loader/encode-query', // loader should be defined BEFORE css-loader
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // outputPath: 'images',
                            // 将图片生成至原来的目录
                            outputPath: 'assets/images',
                            name: '[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
                use: [
                    'url-loader', // or file-loader or svg-url-loader
                    'svg-transform-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/fonts'
                    }
                }]
            },
        ]
    },
    plugins: [
        // 复制遗留的文件到发布目录中，全部修改完该插件会取消
        new CopyPlugin({
            patterns: [{from: 'static/'}],
        }),
        new HtmlWebpackPlugin({ // 默认入口为src/index.ejs
            inject: 'head', // 不能使用默认值，因为遗留的js会因此而报错
        }),
        new HtmlWebpackPlugin({
            filename: "demo.html",
            template: path.resolve(__dirname, "./src/demo.ejs"),
            inject: 'head', // 不能使用默认值，因为遗留的js会因此而报错
        }),
        // CDN的配置，这里的库会默认注入到网页中
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
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new TerserPlugin()
        ]
    }
};

module.exports = config;
