module.exports = (api, options, rootOptions) => {
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      name: options.name,
      description: options.description,
      author: options.author,
      scripts: {
        'lint': 'vue-cli-service lint'
      },
      dependencies: {
        '@mf2e/js-bridge': '^1.0.8',
        '@newsapp-activity/newsapp-share': '^1.6.1',
        'minireset.css': '^0.0.6',
        'register-service-worker': '^1.6.2',
        'vue': '^2.6.10',
        'vue-router': '^3.1.3',
        'vuex': '^3.1.1',
        'whatwg-fetch': '^3.0.0'
      },
      devDependencies: {
        '@vue/cli-plugin-babel': '^3.12.0',
        '@vue/cli-plugin-eslint': '^3.12.0',
        '@vue/cli-plugin-pwa': '^4.0.5',
        '@vue/cli-service': '^3.12.0',
        '@vue/eslint-config-prettier': '^5.0.0',
        'babel-eslint': '^10.0.3',
        'easeftp': '^2.0.40',
        'eslint': '^6.6.0',
        'eslint-plugin-prettier': '^3.1.1',
        'eslint-plugin-vue': '^5.2.3',
        'gulp': '^4.0.2',
        'mocker-api': '^1.9.0',
        'postcss-autosize': '^1.0.2',
        'postcss-preset-env': '^6.7.0',
        'postcss-px-to-viewport': '^1.1.1',
        'tinify-loader': '^0.2.4',
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

  // 使用端内离线方案
  if (options.offline) {
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
