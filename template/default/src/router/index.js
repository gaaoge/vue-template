/**
 * Created by GG on 2017/1/4.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { invoke } from '@mf2e/js-bridge'
import { isNewsapp } from '@/utils/detect'
import { updateShareConfig } from '@/utils/share'
import { trackEvent } from '@/utils/track'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

router.afterEach((to) => {
  // 更新标题
  let title = to.meta.title || process.env.VUE_APP_TITLE
  isNewsapp && invoke('setTitle', { title }, false)
  document.title = title

  // 更新分享配置
  updateShareConfig(to.meta.shareConfig)

  // 统计
  trackEvent('pageview' + to.path.replace(/\//g, '_'))
})

// 默认页面统计
trackEvent('pageview')

export default router
