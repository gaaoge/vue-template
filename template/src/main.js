/**
 * Created by GG on 2016/11/30.
 */

import 'babel-polyfill'
import Vue from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'

// Vue实例
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 离线缓存Service Worker
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
