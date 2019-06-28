const pkg = require('./package.json')
const path = require('path')
const apiMocker = require('mocker-api')

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? `//static.ws.126.net/163/activity/${pkg.name}/`
      : '',
  productionSourceMap: false,
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        'js-bridge': '@mf2e/js-bridge',
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

    config.module.rule('svg').test(/\.(svg|gif|webp)(\?.*)?$/)
  },
  devServer: {
    before(app) {
      apiMocker(app, path.resolve('./mock/index.js'))
    }
  },
  pwa: {
    workboxOptions: {
      importsDirectory: 'static/js',
      exclude: ['index.html'],
      runtimeCaching: [
        {
          urlPattern: /index\.html/,
          handler: 'networkFirst'
        }
      ]
    },
    iconPaths: {
      favicon32: 'static/share-icon.png',
      favicon16: 'static/share-icon.png',
      appleTouchIcon: 'static/share-icon.png',
      maskIcon: 'static/share-icon.png',
      msTileImage: 'static/share-icon.png'
    }
  }
}
