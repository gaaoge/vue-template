const pkg = require('./package.json')
const path = require('path')
const apiMocker = require('mocker-api')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `//static.ws.126.net/163/activity/${pkg.name}` : '',
  productionSourceMap: false,
  assetsDir: 'resource',
  configureWebpack: {
    resolve: {
      alias: {
        'newsapp-api': '@newsapp-activity/newsapp-api',
        'newsapp-share': '@newsapp-activity/newsapp-share'
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendors'
          },
          common: {
            name: 'common'
          }
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g)(\?.*)?$/)
      .use('tinify-loader')
      .loader('tinify-loader')
      .tap(() => {
        return {
          apikey: 'ai3NQ23wq2pbQvy2JNylfuQMNJ99YAOZ',
          cache: path.resolve('node_modules/.cache/tinify-loader')
        }
      })

    config.module
      .rule('svg')
      .test(/\.(svg|gif|webp)(\?.*)?$/)
  },
  devServer: {
    before (app) {
      apiMocker(app, path.resolve('./mock/index.js'))
    }
  },
  pwa: {
    workboxOptions: {
      importsDirectory: 'resource',
      exclude: ['index.html'],
      runtimeCaching: [{
        urlPattern: /index\.html/,
        handler: 'networkFirst'
      }]
    },
    iconPaths: {
      favicon32: 'resource/static/share-icon.png',
      favicon16: 'resource/static/share-icon.png',
      appleTouchIcon: 'resource/static/share-icon.png',
      maskIcon: 'resource/static/share-icon.png',
      msTileImage: 'resource/static/share-icon.png'
    }
  }
}
