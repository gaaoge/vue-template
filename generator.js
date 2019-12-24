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
        '@mf2e/js-bridge': '^1.0.9',
        '@newsapp-activity/newsapp-share': '^1.6.3',
        'core-js': '^3.4.2',
        'minireset.css': '^0.0.6',
        'register-service-worker': '^1.6.2',
        'vue': '^2.6.10',
        'vue-router': '^3.1.3',
        'vuex': '^3.1.2',
        'whatwg-fetch': '^3.0.0'
      },
      devDependencies: {
        '@newap/uploader': '^2.2.15',
        '@vue/cli-plugin-babel': '^4.0.5',
        '@vue/cli-plugin-eslint': '^4.0.5',
        '@vue/cli-plugin-pwa': '^4.0.5',
        '@vue/cli-plugin-router': '^4.0.5',
        '@vue/cli-plugin-vuex': '^4.0.5',
        '@vue/cli-service': '^4.0.5',
        '@vue/eslint-config-prettier': '^6.0.0',
        'babel-eslint': '^10.0.3',
        'chalk': '^3.0.0',
        'eslint': '^6.6.0',
        'eslint-plugin-prettier': '^3.1.1',
        'eslint-plugin-vue': '^6.0.1',
        'inquirer': '^7.0.1',
        'mocker-api': '^1.9.0',
        'postcss-autosize': '^1.0.2',
        'postcss-preset-env': '^6.7.0',
        'postcss-px-to-viewport': '^1.1.1',
        'prettier': '^1.19.1',
        'tinify-loader': '^1.0.0',
        'vue-template-compiler': '^2.6.10'
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
          'pixi.js-legacy': '^5.2.0',
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
          '@mf2e/offline-tool': '^0.0.5'
        }
      }
    })

    api.render('./template/offline')
  }
}
