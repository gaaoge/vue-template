/**
 * Created by GG on 2016/11/30.
 */

import 'utils/rem'
import 'babel-polyfill'
import 'normalize.css'
import 'whatwg-fetch'

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import HelloVue from 'hello-vue'
import CommonModal from './common/Modal'
import CommonToast from './common/Toast'

// 安装Vue功能插件
Vue.use(HelloVue)

// 注册全局通用组件
Vue.component('common-modal', CommonModal)
Vue.component('common-toast', CommonToast)

// Vue实例
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 离线缓存Service Worker
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.onload = () => {
      navigator.serviceWorker.register('service-worker.js')
    }
  }
}
