import { loadScript } from '@/utils/index'
import { register } from 'register-service-worker'

// 移动端console
if (process.env.NODE_ENV === 'development' || /debug/gi.test(location.hash)) {
  loadScript('//cdn.jsdelivr.net/npm/eruda', () => {
    window.eruda.init()
  })
}

if (process.env.NODE_ENV === 'production') {
  // 统计
  loadScript('//static.ws.126.net/163/frontend/libs/antanalysis.min.js')
  loadScript(
    '//static.ws.126.net/163/frontend/antnest/' +
      process.env.VUE_APP_PROJECT_ID +
      '.js'
  )
  loadScript('//hm.baidu.com/hm.js?fbbd5a62f1db722ba672bc37a9bf6b05')

  // 错误监控
  loadScript(
    '//static.ws.126.net/163/frontend/libs/raven-vue-3.26.4.min.js',
    () => {
      window.Raven.config(
        'https://76981b9dcb584c2990e70dc596eeac3c@sentry.music.163.com/13',
        {
          tags: {
            project: process.env.VUE_APP_TITLE,
            projectId: process.env.VUE_APP_PROJECT_ID
          }
        }
      ).install()
    }
  )

  // 离线缓存Service Worker
  register('service-worker.js', {
    registrationOptions: { scope: './' }
  })
}
