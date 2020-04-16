import Vue from 'vue'

// 自动注册全局过滤器
const files = require.context('.', true, /\.js$/)
files.keys().forEach((key) => {
  if (key === './index.js' || !files(key).default) return

  Vue.filter(key.replace(/(\.\/|\/|\.js)/g, ''), files(key).default)
})
