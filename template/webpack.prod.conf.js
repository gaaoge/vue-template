/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf');
const merge = require('webpack-merge');

const pkg = require('./package.json');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = merge.smart(base, {
    output: {
        filename: 'bundle.[chunkhash].js'
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([{
            from: 'resource/statics',
            to: 'resource/statics'
        }]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs',
            filename: 'libs/bundle.[chunkhash].js',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                vue: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }
        }),
        new ExtractTextPlugin({
            filename: 'bundle.[contenthash].css',
            allChunks: true
        }),
        new WebpackMd5Hash(),
        new OfflinePlugin({
            rewrites: {'/': 'index.html'},
            ServiceWorker: {
                cacheName: pkg.name
            },
            AppCache: false
        })
    ],
});