import { loadScript } from '@/utils/index'
import { register } from 'register-service-worker'
import { isTest } from '@/utils/detect'

// 移动端console
if (/debug/gi.test(location.href)) {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

if (!isTest) {
  // 统一性能统计及错误监控
  loadScript('//static.ws.126.net/163/frontend/antnest/NTM-BXR8M5Z5-1.js')

  // 离线缓存Service Worker
  register('service-worker.js', {
    registrationOptions: { scope: './' }
  })
}
