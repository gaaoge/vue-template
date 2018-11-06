/**
 * Created by GG on 2017/1/4.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsappAPI from 'newsapp-api'
import { isOther } from '@/utils/detect'
import { updateShareConfig } from '@/utils/share'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.afterEach((to) => {
  let title = to.meta.title || 'Vue'
  !isOther && NewsappAPI.ui.modifyTitle(title)
  document.title = title

  // 更新分享配置
  updateShareConfig(to.meta.shareConfig)
})

export default router
