import Vue from 'vue'
import NewsappShare from 'newsapp-share'
import { getStaticPath, getAbsPath, toSearchParams } from 'utils'
import { trackEvent } from 'utils/track'

const TOAST_CONFIG = 'TOAST_CONFIG'
const MODAL_CONFIG = 'MODAL_CONFIG'
const SHARE_CONFIG = 'SHARE_CONFIG'

const stores = {
  state: {
    toastConfig: {},
    modalConfig: {},
    shareConfig: {
      title: '分享标题',
      desc: '分享描述',
      imgUrl: getStaticPath('share-icon.png'),
      link: getAbsPath()
    }
  },
  mutations: {
    [TOAST_CONFIG] (state, payload) {
      state.toastConfig = payload
    },
    [MODAL_CONFIG] (state, payload) {
      state.modalConfig = payload
    },
    [SHARE_CONFIG] (state, payload) {
      state.shareConfig = payload
    }
  },
  actions: {
    toast ({state, commit}, payload) {
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
          content: payload,
          timer
        })
      })
    },
    openDialog ({commit}, payload) {
      if (typeof payload === 'string') {
        payload = {dialog: payload}
      }

      commit(MODAL_CONFIG, {
        isShow: true,
        ...payload
      })
    },
    closeDialog ({commit}) {
      commit(MODAL_CONFIG, {})
    },
    updateShareConfig ({state, commit}, payload) {
      let shareConfig = Object.assign({}, state.shareConfig, payload)
      commit(SHARE_CONFIG, shareConfig)
      NewsappShare.config(shareConfig)
    },
    share ({state}, payload) {
      return new Promise(async (resolve, reject) => {
        NewsappShare.config({
          shareDone: () => {
            NewsappShare.config({shareDone: () => {}})
            resolve()

            // 统计
            trackEvent('sharedone')
          }
        })
        NewsappShare.show(payload)
      })
    },
    async fetch ({state, commit, dispatch}, payload) {
      let host = 'https://163.com' // api接口域名
      let {url, method = 'get', params} = payload

      // 本地调试配置
      const debug = process.env.NODE_ENV === 'development'
      if (debug) {
        host = 'api'
        method = 'get'
        url = url.replace(/(\?|#).*/, '') + '.json'
      }

      // 设置headers和body
      let headers = {}
      let body
      if (method === 'post') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        body = toSearchParams(params)
      }

      // 发送fetch请求
      let data
      try {
        let response = await window.fetch(host + url, {
          method,
          headers,
          body,
          credentials: 'include'
        })
        data = await response.json()
      } catch (e) {
        dispatch('toast', '网络请求出错')
        let err = new Error('网络请求出错')
        err.code = 10000
        throw err
      }

      // 处理请求返回结果
      if (data.code !== 200) {
        switch (data.code) {
          default:
            dispatch('toast', data.message)
            break
        }

        let err = new Error(data.message)
        err.code = data.code
        throw err
      }

      return data
    }
  }
}

export default stores
