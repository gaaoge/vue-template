import 'whatwg-fetch'
import Vue from 'vue'
import NewsappAPI from 'newsapp-api'
import { toSearchParams } from '@/utils'
import { isNewsapp } from '@/utils/detect'

import home from '@/pages/home/store'

const TOAST_CONFIG = 'TOAST_CONFIG'
const DIALOG_CONFIG = 'DIALOG_CONFIG'
const REQUEST_HEADER = 'REQUEST_HEADER'

const stores = {
  modules: {
    home
  },
  state: {
    toastConfig: {},
    dialogConfig: {},
    requestHeader: null
  },
  mutations: {
    [TOAST_CONFIG] (state, payload) {
      state.toastConfig = payload
    },
    [DIALOG_CONFIG] (state, payload) {
      state.dialogConfig = payload
    },
    [REQUEST_HEADER] (state, payload) {
      state.requestHeader = payload
    }
  },
  actions: {
    /**
     * 展示toast提示
     * @param {string} content 文本内容
     */
    toast ({ state, commit }, content) {
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
    openDialog ({ state: { dialogConfig }, commit }, payload) {
      let config = Object.assign({}, dialogConfig, {
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
    closeDialog ({ state: { dialogConfig }, commit }, payload) {
      let config = Object.assign({}, dialogConfig, {
        [payload.dialog || payload]: null
      })
      commit(DIALOG_CONFIG, config)
    },
    /**
     * 发送fetch请求
     * @param {Object} payload
     *  {
     *    url: 请求url,
     *    method: 请求方法（默认get）
     *    params: 请求参数，
     *    credentials： 是否携带cookies（默认携带）
     *  }
     */
    async fetch ({ state, commit, dispatch }, payload = {}) {
      let { url, method = 'get', params, credentials = 'include' } = payload

      // 配置url和method
      if (!/^(https?:)?\/\//.test(url) && process.env.NODE_ENV === 'production') {
        let isTest = /wp\.m\.163\.com\/163\/test/.test(window.location.href)
        let host = isTest ? process.env.VUE_APP_TEST_HOST : process.env.VUE_APP_PUBLISH_HOST
        url = host + url
      }
      method = method.toLowerCase()
      if (method === 'get' && params) {
        url = url + '?' + toSearchParams(params)
      }

      // 配置headers和body
      !state.requestHeader && await dispatch('getRequestHeader')
      let headers = Object.assign({}, state.requestHeader)
      let body
      if (method === 'post') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        body = toSearchParams(params)
      }

      // 发送fetch请求
      let data
      try {
        let response = await window.fetch(url, {
          method,
          headers,
          body,
          credentials
        })
        data = await response.json()
      } catch (e) {
        dispatch('toast', '网络请求出错')
        throw new Error('网络请求出错')
      }

      // 处理请求返回结果
      if (data.code !== 10000) {
        switch (data.code) {
          default:
            dispatch('toast', data.message)
            break
        }

        let err = new Error(data.message)
        err.code = data.code
        throw err
      }

      return data.data
    },
    async getRequestHeader ({ commit }) {
      let requestHeader = await new Promise((resolve, reject) => {
        if (/newsapptest/.test(navigator.userAgent) || !isNewsapp) {
          resolve({})
          return
        }

        NewsappAPI.accountInfo((info) => {
          resolve(info)
        })
      })

      commit(REQUEST_HEADER, requestHeader)
    }
  }
}

export default stores
