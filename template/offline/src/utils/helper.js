import Vue from 'vue'
import { invoke } from 'js-bridge'
import { loadScript } from '@/utils/index'
import { trackEvent } from '@/utils/track'

// 移动端console
if (process.env.NODE_ENV === 'development' || /debug/gi.test(location.href)) {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

if (process.env.NODE_ENV === 'production') {
  // 统计
  loadScript(
    'https://static.ws.126.net/163/frontend/libs/antanalysis.min.js',
    () => {
      trackEvent('pageview')
    }
  )

  // 统一性能统计及错误监控
  loadScript('//static.ws.126.net/163/frontend/antnest/NTM-BXR8M5Z5-1.js')
  Vue.config.errorHandler = function(err, vm, info) {
    window.Raven.captureException(err, { extra: info })
    console.error(err)
  }

  // 客户端性能上报
  invoke('updateFailType', { failType: 2002 })
  invoke('render', { timestamp: { render: Date.now() } })
}
