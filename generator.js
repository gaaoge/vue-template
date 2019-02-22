module.exports = (api, options, rootOptions) => {
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      description: options.description,
      author: options.author,
      scripts: {
        'lint': 'vue-cli-service lint'
      },
      dependencies: {
        '@newsapp-activity/newsapp-api': '^1.8.2',
        '@newsapp-activity/newsapp-share': '^1.4.4',
        'minireset.css': '0.0.4',
        'register-service-worker': '^1.6.2',
        'vue': '^2.6.7',
        'vue-router': '^3.0.1',
        'vuex': '^3.0.1'
      },
      devDependencies: {
        '@vue/cli-plugin-babel': '^3.4.1',
        '@vue/cli-plugin-eslint': '^3.4.1',
        '@vue/cli-plugin-pwa': '^3.4.1',
        '@vue/cli-service': '^3.4.1',
        '@vue/eslint-config-standard': '^4.0.0',
        'babel-eslint': '^10.0.1',
        'easeftp': '^2.0.40',
        'eslint': '^5.14.1',
        'eslint-plugin-vue': '^5.2.2',
        'gulp': '^4.0.0',
        'mocker-api': '^1.6.7',
        'postcss-autosize': '^1.0.1',
        'postcss-preset-env': '^6.5.0',
        'postcss-px-to-viewport': '^1.1.0',
        'tinify-loader': '^0.2.4',
        "vue-template-compiler": "^2.6.7"
      },
      browserslist: [
        '> 1%',
        'last 2 versions',
        'Android >= 4.4',
        'iOS >= 8'
      ]
    }
  })

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files).forEach(name => {
      delete files[name]
    })
  })

  // 生成项目文件
  api.render('./template')
}