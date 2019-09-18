const pkg = require('./package.json')
const path = require('path')
const apiMocker = require('mocker-api')

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_STATIC_PATH
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
      importsDirectory: 'static/pwa',
      exclude: ['index.html'],
      runtimeCaching: [
        {
          urlPattern: /index\.html/,
          handler: 'networkFirst'
        }
      ]
    },
    manifestPath: 'static/pwa/manifest.json',
    manifestOptions: {
      icons: [
        {
          src: 'static/share-icon.png',
          sizes: '200x200',
          type: 'image/png'
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
