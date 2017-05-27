/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf');
const merge = require('webpack-merge');

const webpack = require('webpack');

module.exports = merge.smart(base, {
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs',
            filename: `libs/bundle.js`,
            minChunks: Infinity
        })
    ],
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        clientLogLevel: 'none',
        noInfo: true,
        compress: true,
        historyApiFallback: true
    },
    devtool: '#eval-source-map'
});