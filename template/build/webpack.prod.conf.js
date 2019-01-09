/**
 * Created by GG on 16/12/01.
 */

const pkg = require('../package.json')
const base = require('./webpack.base.conf')
const merge = require('webpack-merge')

const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge.smart(base, {
  mode: 'production',
  output: {
    publicPath: `${pkg.cdn}/${pkg.name}/`,
    filename: 'resource/js/[name].[contenthash:10].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
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
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['../dist'], {
      allowExternal: true,
      verbose: false
    }),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'resource/static'
    }]),
    new MiniCssExtractPlugin({
      filename: 'resource/css/[name].[contenthash:10].css'
    })
  ]
})
