import 'whatwg-fetch'
import { invoke, isAvailable } from 'js-bridge'
import { toSearchParams } from '@/utils'
import { isNewsapp } from '@/utils/detect'
import modules from './modules'

const stores = {
  modules,
  actions: {
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
    async fetch({ dispatch }, payload = {}) {
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

      // 配置headers和params
      if (method === 'post') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        params = toSearchParams(params)
      }

      // 发送fetch请求
      let data
      try {
        if (isAvailable('request')) {
          let res = await invoke('request', {
            method,
            url,
            headers,
            data: params
          })
          data = JSON.parse(res)
        } else {
          !requestHeader && (await getRequestHeader())
          headers = Object.assign({}, requestHeader, headers)
          let res = await window.fetch(url, {
            method,
            headers,
            body: params
          })
          data = await res.json()
        }
      } catch (e) {
        throw new Error('网络请求错误')
      }

      // 处理错误返回结果
      if (data.code !== 10000) {
        switch (data.code) {
          default:
            dispatch('app/toast', data.msg)
            break
        }

        let err = new Error('网络请求错误:' + data.msg)
        err.code = data.code
        throw err
      }

      return data.data
    }
  }
}

let requestHeader // 客户端请求头
function getRequestHeader() {
  return new Promise(resolve => {
    if (/newsapptest/.test(navigator.userAgent) || !isNewsapp) {
      resolve()
      return
    }

    invoke('getHeaders').then(res => {
      requestHeader = res
      resolve()
    })
  })
}

export default stores
