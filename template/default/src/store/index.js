/**
 * Created by GG on 2017/6/28.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import stores from './stores'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  ...stores,
})

export default store
