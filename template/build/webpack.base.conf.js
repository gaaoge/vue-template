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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:10].[ext]',
              outputPath: 'static/img/'
            }
          },
          {
            loader: 'tinify-loader',
            options: {
              apikey: 'ai3NQ23wq2pbQvy2JNylfuQMNJ99YAOZ',
              cache: path.resolve('node_modules/.cache/tinify')
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:10].[ext]',
          outputPath: 'static/media/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:10].[ext]',
          outputPath: 'static/font/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      'hello-vue': '@newsapp-activity/hello-vue',
      'newsapp-api': '@newsapp-activity/newsapp-api',
      'newsapp-share': '@newsapp-activity/newsapp-share'
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
