import Vue from 'vue'

const TOAST_CONFIG = 'TOAST_CONFIG'
const DIALOG_CONFIG = 'DIALOG_CONFIG'

const stores = {
  namespaced: true,
  state: {
    toastConfig: {},
    dialogConfig: {}
  },
  mutations: {
    [TOAST_CONFIG](state, payload) {
      state.toastConfig = payload
    },
    [DIALOG_CONFIG](state, payload) {
      state.dialogConfig = payload
    }
  },
  actions: {
    /**
     * 展示toast提示
     * @param {string} content 文本内容
     */
    toast({ state, commit }, content) {
      if (state.toastConfig.timer) {
        clearTimeout(state.toastConfig.timer)
        commit(TOAST_CONFIG, {})
      }
      let timer = setTimeout(() => {
        commit(TOAST_CONFIG, {})
      }, 2000)

      Vue.nextTick(() => {
        commit(TOAST_CONFIG, {
          isShow: true,
          content,
          timer
        })
      })
    },
    /**
     * 打开弹窗
     * @param {String|Object} payload 支持字符串或者对象参数
     *  String参数：弹窗名称
     *  Object参数：{
     *    dialog: 弹窗名称
     *    isScroll: 弹窗是否可滚动
     *    isForce: 弹窗是否强制展示（点击弹窗周围空白处不可关闭）
     *    params: 其他弹窗参数
     *  }
     */
    openDialog({ state, commit }, payload) {
      let config = Object.assign({}, state.dialogConfig, {
        [payload.dialog || payload]: payload
      })
      commit(DIALOG_CONFIG, config)
    },
    /**
     * 关闭弹窗
     * @param {String|Object} payload 支持字符串或者对象参数
     *  String参数：弹窗名称
     *  Object参数：{
     *    dialog: 弹窗名称
     *  }
     */
    closeDialog({ state, commit }, payload) {
      let config = Object.assign({}, state.dialogConfig, {
        [payload.dialog || payload]: null
      })
      commit(DIALOG_CONFIG, config)
    }
  }
}

export default stores
