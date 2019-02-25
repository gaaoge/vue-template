import Vue from 'vue'
import filters from './filters'

// 注册全局filter
Object.keys(filters).forEach(key => {
  Vue.directive(key, filters[key])
})
