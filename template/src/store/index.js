/**
 * Created by GG on 2017/6/28.
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOAST_CONFIG = 'TOAST_CONFIG'

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    toastConfig: {}
  },
  mutations: {
    [TOAST_CONFIG] (state, payload) {
      state.toastConfig = payload
    }
  },
  actions: {
    toast ({state, commit, dispatch}, content) {
      if (state.toastConfig.timer) {
        clearTimeout(state.toastConfig.timer)
        commit(TOAST_CONFIG, {isShow: false})
      }
      let timer = setTimeout(() => {
        commit(TOAST_CONFIG, {isShow: false})
      }, 2000)

      Vue.nextTick(() => {
        commit(TOAST_CONFIG, {
          isShow: true,
          content: content,
          timer
        })
      })
    }
  }
})

export default store
