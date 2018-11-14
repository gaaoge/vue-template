/**
 * Created by GG on 2016/11/30.
 */

import '@/utils/rem'
import 'babel-polyfill'
import 'normalize.css'
import 'whatwg-fetch'

import '@/components'
import '@/directives'
import '@/filters'

import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App'

import { loadScript, getSearch } from '@/utils'
import { projectId } from '@/utils/track'

// Vue实例
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 移动端console
if (process.env.NODE_ENV === 'development' || getSearch('debug')) {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

if (process.env.NODE_ENV === 'production') {
  // 离线缓存Service Worker
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.onload = () => {
      navigator.serviceWorker.register('service-worker.js')
    }
  }

  // 统计
  loadScript('//static.ws.126.net/163/frontend/antnest/' + projectId + '.js')

  // 错误监控
  loadScript('https://static.ws.126.net/163/frontend/libs/raven-vue-3.26.4.min.js', () => {
    window.Raven.config('https://76981b9dcb584c2990e70dc596eeac3c@sentry.music.163.com/13').install()
  })
}
