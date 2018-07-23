/**
 * Created by GG on 16/12/01.
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            audio: 'src'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          outputPath: 'img/'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          outputPath: 'media/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          outputPath: 'font/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      assets: path.resolve('src/assets'),
      components: path.resolve('src/components'),
      pages: path.resolve('src/pages'),
      utils: path.resolve('src/utils')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        default: {
          reuseExistingChunk: false,
          minChunks: 2,
          name: 'split'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ]
}
