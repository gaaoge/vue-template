/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge.smart(base, {
  output: {
    filename: '[name].js'
  },
  module:{
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: 'resource/assets/'
        }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    clientLogLevel: 'none',
    noInfo: true,
    compress: true,
    historyApiFallback: true
  },
  devtool: '#eval-source-map'
})
