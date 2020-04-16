/**
 * Created by GG on 2016/11/30.
 */

import '@/utils/helper'
import '@/components'
import '@/directives'
import '@/filters'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App'

// Vue实例
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
