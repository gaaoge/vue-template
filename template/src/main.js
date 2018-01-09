/**
 * Created by GG on 2016/11/30.
 */

import 'babel-polyfill'
import 'normalize.css'
import 'whatwg-fetch'

import Vue from 'vue'
import router from './router'
import store from './store'
import { initRem } from './utils/rem'
import App from './App.vue'

// 初始化rem
initRem()

// Vue实例
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 离线缓存Service Worker
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
