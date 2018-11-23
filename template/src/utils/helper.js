import { getSearch, loadScript } from '@/utils/index'
import { projectId } from '@/utils/track'

// 移动端console
if (process.env.NODE_ENV === 'development' || getSearch('debug')) {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

if (process.env.NODE_ENV === 'production') {
  // 统计
  loadScript('https://static.ws.126.net/163/frontend/antnest/' + projectId + '.js')
  loadScript('https://hm.baidu.com/hm.js?fbbd5a62f1db722ba672bc37a9bf6b05')

  // 错误监控
  loadScript('https://static.ws.126.net/163/frontend/libs/raven-vue-3.26.4.min.js', () => {
    window.Raven.config('https://76981b9dcb584c2990e70dc596eeac3c@sentry.music.163.com/13', {
      tags: {
        project: document.title
      }
    }).install()
  })

  // 离线缓存Service Worker
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.onload = () => {
      try {
        navigator.serviceWorker.register('service-worker.js')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
