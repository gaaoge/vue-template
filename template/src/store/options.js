import Vue from 'vue'

const TOAST_CONFIG = 'TOAST_CONFIG'

const options = {
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
}

export default options
