import 'whatwg-fetch'
import Vue from 'vue'
import { invoke, isAvailable } from 'js-bridge'
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
    [TOAST_CONFIG](state, payload) {
      state.toastConfig = payload
    },
    [DIALOG_CONFIG](state, payload) {
      state.dialogConfig = payload
    },
    [REQUEST_HEADER](state, payload) {
      state.requestHeader = payload
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
    },
    /**
     * 发送fetch请求
     * @param {Object} payload
     *  {
     *    url: 请求url,
     *    method: 请求方法（默认get）
     *    headers: 请求头
     *    params: 请求参数
     *  }
     */
    async fetch({ state, dispatch }, payload = {}) {
      let { url, method = 'get', headers = {}, params } = payload
      // 配置url和method
      if (
        !/^(https?:)?\/\//.test(url) &&
        process.env.NODE_ENV === 'production'
      ) {
        url = process.env.VUE_APP_BASE_URL + url
      }
      method = method.toLowerCase()
      if (method === 'get' && params) {
        url = url + '?' + toSearchParams(params)
      }

      // 配置headers和body
      !state.requestHeader && (await dispatch('getRequestHeader'))
      headers = Object.assign({}, state.requestHeader, headers)
      let body
      if (method === 'post') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        body = toSearchParams(params)
      }

      // 发送fetch请求
      let data
      try {
        if (isAvailable('request')) {
          let res = await invoke('request', {
            method,
            url,
            headers,
            data: body
          })
          data = JSON.parse(res)
        } else {
          let res = await window.fetch(url, {
            method,
            headers,
            body
          })
          data = await res.json()
        }
      } catch (e) {
        let err = new Error('网络请求出错')
        err.code = -1
        throw err
      }

      // 处理错误返回结果
      if (data.code !== 10000) {
        switch (data.code) {
          default:
            dispatch('toast', data.msg)
            break
        }

        let err = new Error(data.msg)
        err.code = data.code
        throw err
      }

      return data.data
    },
    async getRequestHeader({ commit }) {
      let requestHeader = await new Promise(resolve => {
        if (/newsapptest/.test(navigator.userAgent) || !isNewsapp) {
          resolve({})
          return
        }

        invoke('getHeaders').then(res => {
          resolve(res)
        })
      })

      commit(REQUEST_HEADER, requestHeader)
    }
  }
}

export default stores
