module.exports = (api, options, rootOptions) => {
  api.extendPackage((pkg) => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      name: options.name,
      description: options.description,
      author: options.author,
      scripts: {
        'lint': 'vue-cli-service lint',
        'upload': 'node uploader.js',
      },
      dependencies: {
        '@mf2e/js-bridge': '^1.0.11',
        '@newsapp-activity/newsapp-share': '^1.6.7',
        'better-scroll': '^2.0.0-beta.6',
        'minireset.css': '^0.0.6',
        'register-service-worker': '^1.7.1',
        'vue': '^2.6.11',
        'vue-router': '^3.3.4',
        'vuex': '^3.5.1',
        'whatwg-fetch': '^3.2.0',
      },
      devDependencies: {
        '@newap/uploader': '^2.2.16',
        '@vue/cli-plugin-babel': '^4.4.6',
        '@vue/cli-plugin-eslint': '^4.4.6',
        '@vue/cli-plugin-pwa': '^4.4.6',
        '@vue/cli-service': '^4.4.6',
        '@vue/eslint-config-prettier': '^6.0.0',
        'babel-eslint': '^10.1.0',
        'chalk': '^4.1.0',
        'eslint': '^7.5.0',
        'eslint-plugin-prettier': '^3.1.4',
        'eslint-plugin-vue': '^6.2.2',
        'inquirer': '^7.3.3',
        'mocker-api': '^2.2.0',
        'postcss-autosize': '^1.0.2',
        'postcss-plugin-px2rem': '^0.8.1',
        'postcss-preset-env': '^6.7.0',
        'prettier': '^2.0.5',
        'tinify-loader': '^1.0.0',
        'vue-template-compiler': '^2.6.11',
      },
      browserslist: ['> 1%', 'last 2 versions', 'Android >= 4', 'iOS >= 8'],
    }
  })

  api.render((files) => {
    Object.keys(files).forEach((name) => {
      delete files[name]
    })
  })
  api.render('./template/default')

  // 使用dragonbones龙骨动画
  if (options.extends.includes('dragonbones')) {
    api.extendPackage(() => {
      return {
        dependencies: {
          'pixi.js-legacy': '^5.3.2',
          'pixi5-dragonbones': '^5.7.0',
        },
      }
    })

    api.render('./template/dragonbones')
  }

  // 使用客户端离线功能
  if (options.extends.includes('offline')) {
    api.extendPackage(() => {
      return {
        devDependencies: {
          '@mf2e/offline-tool': '^0.1.1',
        },
      }
    })

    api.render('./template/offline')
  }
}
