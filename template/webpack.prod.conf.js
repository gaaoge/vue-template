/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf')
const merge = require('webpack-merge')

const pkg = require('./package.json')
const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

module.exports = merge.smart(base, {
  output: {
    filename: '[name]/[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: base.module.rules[0].options.postcss,
          loaders: {
            css: ExtractTextPlugin.extract({
              use: {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              }
            })
          }
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          publicPath: '../resource/assets/'
        }
      }
    ]
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('[name]/[contenthash].css')
      },
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
  ]
})
