/**
 * Created by GG on 2016/11/30.
 */

import '@/utils/rem'
import 'babel-polyfill'
import 'normalize.css'
import 'whatwg-fetch'

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import { loadScript } from '@/utils'
import { trackEvent, projectId } from '@/utils/track'

// 注册全局指令
Vue.directive('track-event', {
  bind (el, binding) {
    el.addEventListener('click', () => {
      trackEvent('click_' + binding.value)
    })
  }
})

// Vue实例
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 移动端console
if (process.env.NODE_ENV === 'development') {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

// 离线缓存Service Worker
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.onload = () => {
      navigator.serviceWorker.register('service-worker.js')
    }
  }
}

// 统计
if (process.env.NODE_ENV === 'production') {
  loadScript('//static.ws.126.net/163/frontend/antnest/' + projectId + '.js')
}
