/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge.smart(base, {
  mode: 'development',
  output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader?insertAt=top!css-loader'
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    compress: true,
    stats: 'errors-only',
    clientLogLevel: 'none'
  },
  devtool: '#eval-source-map'
})
