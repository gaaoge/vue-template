/**
 * Created by GG on 16/12/01.
 */

const base = require('./webpack.base.conf')
const merge = require('webpack-merge')

const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  {
    loader: 'css-loader',
    options: {
      minimize: true
    }
  }
]

module.exports = merge.smart(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:10].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: cssLoader
          },
          transformToRequire: {
            audio: 'src'
          }
        }
      },
      {
        test: /\.css$/,
        loader: cssLoader
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
      allowExternal: true,
      verbose: false
    }),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static'
    }]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:10].css'
    })
  ]
})
