/**
 * Created by GG on 16/12/01.
 */

const pkg = require('../package.json')
const base = require('./webpack.base.conf')
const css = require('./css.conf')
const merge = require('webpack-merge')

const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const TinyPNGWebpackPlugin = require('tinypng-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

module.exports = merge.smart(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: css.postcss,
          loaders: {
            css: css.cssLoader
          }
        }
      },
      {
        test: /\.css$/,
        loader: css.cssLoader
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            ascii_only: true
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['../dist'], {
      allowExternal: true
    }),
    new CopyWebpackPlugin([{
      from: 'resource/static',
      to: 'static'
    }]),
    new ExtractTextWebpackPlugin({
      filename: (getPath) => {
        return getPath('css/[name].[contenthash].css')
      },
      allChunks: true
    }),
    new TinyPNGWebpackPlugin({
      key: '6-qmxQevyQCCYb-gqGTMnF6LTE8Dzo3j'
    }),
    new OfflinePlugin({
      excludes: ['index.html'],
      ServiceWorker: {
        output: 'service-worker.js',
        publicPath: 'service-worker.js',
        cacheName: pkg.name,
        minify: true
      },
      AppCache: false
    })
  ]
})
