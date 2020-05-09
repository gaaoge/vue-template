/**
 * Created by GG on 2017/6/28.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import stores from './stores'
import { isDev } from '@/utils/detect'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: isDev,
  ...stores,
})

export default store
