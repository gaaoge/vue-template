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
        '@mf2e/js-bridge': '^1.0.6',
        '@newsapp-activity/newsapp-share': '^1.5.0',
        'minireset.css': '^0.0.5',
        'register-service-worker': '^1.6.2',
        'vue': '^2.6.10',
        'vue-router': '^3.0.6',
        'vuex': '^3.1.1',
        'whatwg-fetch': '^3.0.0'
      },
      devDependencies: {
        '@mf2e/offline-tool': '0.0.1',
        '@vue/cli-plugin-babel': '^3.9.2',
        '@vue/cli-plugin-eslint': '^3.9.2',
        '@vue/cli-plugin-pwa': '^3.9.0',
        '@vue/cli-service': '^3.9.3',
        '@vue/eslint-config-prettier': '^5.0.0',
        'babel-eslint': '^10.0.2',
        'easeftp': '^2.0.40',
        'eslint': '^6.1.0',
        'eslint-plugin-vue': '^5.2.3',
        'eslint-plugin-prettier': '3.1.0',
        'gulp': '^4.0.2',
        'mocker-api': '^1.7.6',
        'postcss-autosize': '^1.0.1',
        'postcss-preset-env': '^6.7.0',
        'postcss-px-to-viewport': '^1.1.0',
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

  api.render('./template')
}
