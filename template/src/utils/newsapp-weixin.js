;(function (window) {
  // 可配置选项
  var appid = 'wx48a26249513fd3a2'
  var product = 'newsapp_163'

  window.NewsappWeixin = {
    isWeixin: /micromessenger/ig.test(navigator.userAgent),
    config: function (params) {
      appid = params.appid
      product = params.product
    },
    login: function (url) {
      url = url || window.location.href
      var ursUrl = 'https://reg.163.com/outerLogin/oauth2/weixin_connect.do?product=' + product + '&url=' + encodeURIComponent(url)
      var redirectUrl = 'https://c.m.163.com/nc/wechat/oauth/response.html?url=' + encodeURIComponent(ursUrl)

      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(redirectUrl) +
        '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    },
    logout: function (url) {
      url = url || window.location.href
      window.location.href = 'https://reg.163.com/Logout.jsp?url=' + encodeURIComponent(url)
    },
    getUserInfo: function (callback) {
      if (!window.NewsappWeixin.isLogin()) {
        callback.call(this)
        return
      }

      jsonp({
        url: 'https://c.m.163.com/nc/wechat/user/info.html',
        data: {
          username: window.NewsappWeixin.getPassport()
        },
        success: function (data) {
          if (data.openid) {
            callback.call(this, data)

            // 统计上报
            if (window['NTESAntAnalysis']) {
              window['NTESAntAnalysis'].sendData({
                projectid: 'NTM-BXR8M5Z5-2',
                val_nm: 'weixinLogin',
                val_act: 'weixinUserInfo',
                info: data
              })
            }
          } else {
            callback.call(this)
          }
        },
        fail: function () {
          callback.call(this)
        }
      })
    },
    getPassport: function () {
      return getCookie('P_OINFO').split('|')[0]
    },
    isLogin: function () {
      return !!getCookie('S_OINFO')
    }
  }

  // 获取cookies
  function getCookie (name) {
    var regexp = new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(name).replace(/[-.+*]/g, '\\$&') +
      '\\s*\\=\\s*([^;]*).*$)|^.*$')
    return decodeURIComponent(document.cookie.replace(regexp, '$1')) || ''
  }

  // jsonp请求
  function jsonp (options) {
    options = options || {}
    if (!options.url) {
      throw new Error('参数不合法')
    }

    options.callback = options.callback || 'callback'
    options.callbackName = options.callbackName || ('jsonp_' + Math.random()).replace('.', '')
    options.data = options.data || {}
    options.data[options.callback] = options.callbackName

    var oHead = document.getElementsByTagName('head')[0]
    var oScript = document.createElement('script')
    oHead.appendChild(oScript)

    // 创建jsonp回调函数
    window[options.callbackName] = function (json) {
      clearTimeout(timer)
      oHead.removeChild(oScript)
      window[options.callbackName] = null
      options.success && options.success(json)
    }

    // 超时处理
    var timer
    if (options.timeout) {
      timer = setTimeout(function () {
        oHead.removeChild(oScript)
        window[options.callbackName] = null
        options.fail && options.fail({message: '超时'})
      }, options.timeout)
    }

    // 发送请求
    oScript.src = options.url + '?' + formatParams(options.data)

    function formatParams (data) {
      var arr = []
      for (var name in data) {
        if (data.hasOwnProperty(name)) {
          arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
        }
      }
      return arr.join('&')
    }
  }
}(window))

export default window.NewsappWeixin
