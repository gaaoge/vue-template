import Vue from 'vue'
import directives from './directives'

// 注册全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
