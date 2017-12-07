;(function (window) {
  var shareConfig = {
    onlyImage: false,
    shareDone: function () {}
  }
  var shareData = {
    weibo: '',
    title: '',
    desc: '',
    img_url: '',
    link: ''
  }

  window.NewsappShare = {
    config: function (data) {
      for (var key in data) {
        var value = data[key]
        if (shareConfig.hasOwnProperty(key)) {
          shareConfig[key] = value
        }
        if (key === 'shareDone') {
          window.__newsapp_share_done = value
        }
      }
    },
    update: function (data) {
      for (var key in data) {
        var value = data[key]
        if (shareData.hasOwnProperty(key)) {
          shareData[key] = value
        }
        if (key === 'img_url') {
          shareData.img_url = getAbsPath(value)
        }
        if (key === 'link') {
          shareData.link = getAbsPath(value)
          getAntShareLink(value, function (link) {
            shareData.link = link
            updateHiddenElement()
          })
        }
      }
      updateHiddenElement()
    },
    getShareUrl: function (type) {
      switch (type) {
        case 'weibo':
          return replaceUrl('http://service.weibo.com/share/share.php?url={link}&title={title}&pic={img_url}&searchPic=true')
        case 'qzone':
          return replaceUrl('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={link}&desc=&summary={desc}&title={title}&otype=share&pics={img_url}')
        case 'yixin':
          return replaceUrl('http://open.yixin.im/share?appKey=&type=webpage&title={title}&desc={desc}&userdesc=&pic={img_url}&url={link}')
      }
    }
  }

  // 微信分享设置
  document.addEventListener('WeixinJSBridgeReady', function () {
    window.WeixinJSBridge.on('menu:share:appmessage', function () {
      window.WeixinJSBridge.invoke('sendAppMessage', shareData, function (res) {
        if (res.err_msg === 'send_app_msg:confirm') {
          shareConfig.shareDone()
        }
      })
    })
    window.WeixinJSBridge.on('menu:share:timeline', function () {
      window.WeixinJSBridge.invoke('shareTimeline', shareData, function (res) {
        if (res.err_msg === 'share_timeline:ok') {
          shareConfig.shareDone()
        }
      })
    })
  }, false)

  function getAbsPath (url) {
    if (url) {
      var a = document.createElement('a')
      a.href = url
      return a.href
    } else {
      return window.location.href.replace(/(\?|#).*/, '')
    }
  }

  function getAntShareLink (url, callback) {
    if (window['NTESAntAnalysis']) {
      var link = window['NTESAntAnalysis'].getShareLink(getAbsPath(url))
      callback && callback(link)
    } else {
      window.addEventListener('NTMReady', () => {
        var link = window['NTESAntAnalysis'].getShareLink(getAbsPath(url))
        callback && callback(link)
      })
    }
  }

  function updateHiddenElement () {
    var el = document.getElementById('__newsapp_share')
    if (!el) {
      el = document.createElement('div')
      el.id = '__newsapp_share'
      el.style.display = 'none'
      document.body.insertBefore(el, document.body.childNodes[0])
    }

    var html = ''
    html += '<div id="__newsapp_sharetext">' + (shareData.weibo || shareData.title) + ' ' + shareData.link + '</div>'
    html += '<div id="__newsapp_sharephotourl">' + shareData.img_url + '</div>'
    html += '<div id="__newsapp_sharewxtitle">' + shareData.title + '</div>'
    html += '<div id="__newsapp_sharewxtext">' + shareData.desc + '</div>'
    html += '<div id="__newsapp_sharewxthumburl">' + shareData.img_url + '</div>'
    if (!shareConfig.onlyImage) {
      html += '<div id="__newsapp_sharewxurl">' + shareData.link + '</div>'
    }

    el.innerHTML = html
  }

  function replaceUrl (url) {
    return url.replace(/{([^}]*)}/g, function ($0, $1) {
      return encodeURIComponent(shareData[$1])
    })
  }
}(window))

export default window.NewsappShare
