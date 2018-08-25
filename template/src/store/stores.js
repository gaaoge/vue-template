import Vue from 'vue'

const TOAST_CONFIG = 'TOAST_CONFIG'
const MODAL_CONFIG = 'MODAL_CONFIG'

const stores = {
  state: {
    toastConfig: {},
    modalConfig: {}
  },
  mutations: {
    [TOAST_CONFIG] (state, payload) {
      state.toastConfig = payload
    },
    [MODAL_CONFIG] (state, payload) {
      state.modalConfig = payload
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
    },
    openDialog ({commit}, dialog) {
      commit(MODAL_CONFIG, {
        isShow: true,
        isScroll: dialog.isScroll,
        dialog
      })
    },
    closeDialog ({commit}) {
      commit(MODAL_CONFIG, {})
    }
  }
}

export default stores
