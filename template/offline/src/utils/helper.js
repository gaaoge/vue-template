import { loadScript } from '@/utils'
import { isNewsapp, isDebug, isOnline } from '@/utils/detect'
import { renderStart, renderEnd } from '@/utils/offline'
import { register } from 'register-service-worker'

// 移动端console
if (isDebug) {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

if (isOnline) {
  // 统一性能统计及错误监控
  loadScript('//static.ws.126.net/163/frontend/antnest/NTM-BXR8M5Z5-1.js')

  if (!isNewsapp) {
    // 离线缓存Service Worker
    register('service-worker.js', {
      registrationOptions: { scope: './' },
    })
  } else {
    // render上报
    renderStart()
    document.addEventListener('DOMContentLoaded', () => {
      renderEnd()
    })
  }
}
