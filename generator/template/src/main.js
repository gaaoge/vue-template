/**
 * Created by GG on 2016/11/30.
 */

import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/components'
import '@/directives'
import '@/filters'
import '@/utils/helper'

// Vue实例
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
