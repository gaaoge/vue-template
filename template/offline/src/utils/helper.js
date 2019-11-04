import { loadScript } from '@/utils/index'
import { isNewsapp } from '@/utils/detect'
import { register } from 'register-service-worker'

// 移动端console
if (process.env.NODE_ENV === 'development' || /debug/gi.test(location.href)) {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

if (process.env.NODE_ENV === 'production') {
  // 统一性能统计及错误监控
  loadScript('//static.ws.126.net/163/frontend/antnest/NTM-BXR8M5Z5-1.js')

  // 离线缓存Service Worker
  !isNewsapp &&
    register('service-worker.js', {
      registrationOptions: { scope: './' }
    })
}
