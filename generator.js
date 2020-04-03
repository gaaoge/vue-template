module.exports = (api, options, rootOptions) => {
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      name: options.name,
      description: options.description,
      author: options.author,
      scripts: {
        'lint': 'vue-cli-service lint',
        'upload': 'node uploader.js'
      },
      dependencies: {
        '@mf2e/js-bridge': '^1.0.11',
        '@newsapp-activity/newsapp-share': '^1.6.5',
        'core-js': '^3.6.4',
        'minireset.css': '^0.0.6',
        'register-service-worker': '^1.6.2',
        'vue': '^2.6.11',
        'vue-router': '^3.1.6',
        'vuex': '^3.1.2',
        'whatwg-fetch': '^3.0.0'
      },
      devDependencies: {
        '@newap/uploader': '^2.2.16',
        '@vue/cli-plugin-babel': '^4.2.3',
        '@vue/cli-plugin-eslint': '^4.2.3',
        '@vue/cli-plugin-pwa': '^4.2.3',
        '@vue/cli-plugin-router': '^4.2.3',
        '@vue/cli-plugin-vuex': '^4.2.3',
        '@vue/cli-service': '^4.2.3',
        '@vue/eslint-config-prettier': '^6.0.0',
        'babel-eslint': '^10.1.0',
        'chalk': '^3.0.0',
        'eslint': '^6.8.0',
        'eslint-plugin-prettier': '^3.1.2',
        'eslint-plugin-vue': '^6.2.1',
        'inquirer': '^7.0.6',
        'mocker-api': '^1.13.0',
        'postcss-autosize': '^1.0.2',
        'postcss-plugin-px2rem': '^0.8.1',
        'postcss-preset-env': '^6.7.0',
        'prettier': '^1.19.1',
        'tinify-loader': '^1.0.0',
        'vue-template-compiler': '^2.6.11'
      },
      browserslist: ['> 1%', 'last 2 versions', 'Android >= 4.4', 'iOS >= 8']
    }
  })

  api.render(files => {
    Object.keys(files).forEach(name => {
      delete files[name]
    })
  })
  api.render('./template/default')

  // 使用dragonbones龙骨动画
  if (options.extends.includes('dragonbones')) {
    api.extendPackage(() => {
      return {
        dependencies: {
          'pixi.js-legacy': '^5.2.1',
          'pixi5-dragonbones': '^5.7.0'
        }
      }
    })

    api.render('./template/dragonbones')
  }

  // 使用客户端离线功能
  if (options.extends.includes('offline')) {
    api.extendPackage(() => {
      return {
        devDependencies: {
          '@mf2e/offline-tool': '^0.1.0'
        }
      }
    })

    api.render('./template/offline')
  }
}
