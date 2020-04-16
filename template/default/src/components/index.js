import Vue from 'vue'

// 自动注册全局组件, 组件名为文件名（例：app-toast）
const files = require.context('.', true, /\.vue$/)
files.keys().forEach((key) => {
  if (key === './index.js' || !files(key).default) return

  Vue.component(key.replace(/(.*\/)*([^.]+).*/gi, '$2'), files(key).default)
})

// 注册第三方全局组件
