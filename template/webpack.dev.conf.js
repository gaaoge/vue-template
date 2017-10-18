/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf');
const merge = require('webpack-merge');

const webpack = require('webpack');

module.exports = merge.smart(base, {
    output: {
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        })
    ],
    devServer: {
        host: '0.0.0.0',
        clientLogLevel: 'none',
        noInfo: true,
        compress: true,
        historyApiFallback: true
    },
    devtool: '#eval-source-map'
});