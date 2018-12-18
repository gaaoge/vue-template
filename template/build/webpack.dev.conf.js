/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge.smart(base, {
  mode: 'development',
  output: {
    filename: 'resource/js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    compress: true,
    stats: 'errors-only',
    clientLogLevel: 'none',
    disableHostCheck: true
  },
  devtool: '#eval-source-map'
})
