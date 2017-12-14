;(function () {
  var appName = ''
  var shareConfig = {
    title: '',
    desc: '',
    imgUrl: '',
    link: '',
    shareDone: function () {},
    onlyImg: false
  }

  window.NewsappShare = {
    config: function (data) {
      for (var key in data) {
        var value = data[key]
        if (shareConfig.hasOwnProperty(key)) {
          shareConfig[key] = value
        }

        if (key === 'imgUrl') {
          shareConfig.imgUrl = getAbsPath(value)
        }
        if (key === 'link') {
          shareConfig.link = getAbsPath(value)
          setTimeout(updateAntShareLink, 500)
        }
      }
      config()
    },
    show: show
  }

  function getAbsPath (url) {
    if (url) {
      var a = document.createElement('a')
      a.href = url
      return a.href
    } else {
      return window.location.href.replace(/(\?|#).*/, '')
    }
  }

  function loadScript (url, callback) {
    var script = document.createElement('script')
    script.src = url
    script.onload = function () {
      callback && callback()
      script.parentNode.removeChild(script)
    }
    var target = document.getElementsByTagName('script')[0]
    target.parentNode.insertBefore(script, target)
  }

  function init (callback) {
    window.navigator.userAgent.replace(/(newsapp|micromessenger|qq|qzone)\//ig, function ($0, $1) {
      appName = $1 && $1.toLowerCase()
    })

    switch (appName) {
      case 'newsapp':
        if (!window.newsappAPI) {
          loadScript('//static.ws.126.net/utf8/3g/activity/libs/newsapp.min.js', callback)
        } else {
          callback()
        }
        break
      case 'micromessenger':
        if (!window.wx) {
          loadScript('//res.wx.qq.com/open/js/jweixin-1.3.0.js', function () {
            window.wx.config({
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
              ]
            })
            window.wx.ready(callback)
          })
        } else {
          callback()
        }
        break
      case 'qq':
        if (!window.mqq) {
          loadScript('//open.mobile.qq.com/sdk/qqapi.js', callback)
        } else {
          callback()
        }
        break
      case 'qzone':
        if (!window.mqq) {
          loadScript('//qzonestyle.gtimg.cn/qzone/hybrid/lib/jsbridge.js', callback)
        } else {
          callback()
        }
        break
      default:
        callback()
        break
    }
  }

  function config () {
    init(function () {
      switch (appName) {
        case 'newsapp':
          if (!shareConfig.onlyImg) {
            window.newsappAPI.share.setShareData({
              wxTitle: shareConfig.title,
              wxText: shareConfig.desc,
              wxImg: shareConfig.imgUrl,
              wxUrl: shareConfig.link,
              wbImg: shareConfig.imgUrl,
              wbText: shareConfig.title + ' ' + shareConfig.link,
              shareDone: shareConfig.shareDone
            })
          } else {
            window.newsappAPI.share.setShareData({
              wbImg: shareConfig.imgUrl,
              shareDone: shareConfig.shareDone
            })
          }
          break
        case 'micromessenger':
          var config = {
            title: shareConfig.title,
            desc: shareConfig.desc,
            imgUrl: shareConfig.imgUrl,
            link: shareConfig.link,
            success: shareConfig.shareDone
          }

          window.wx.onMenuShareTimeline(config)
          window.wx.onMenuShareAppMessage(config)
          window.wx.onMenuShareQQ(config)
          window.wx.onMenuShareWeibo(config)
          window.wx.onMenuShareQZone(config)
          break
        case 'qq':
        case 'qzone':
          window.mqq.data.setShareInfo({
            title: shareConfig.title,
            desc: shareConfig.desc,
            image_url: shareConfig.imgUrl,
            share_url: shareConfig.link
          })
          break
        default:
          var urls = {
            weibo: 'http://service.weibo.com/share/share.php?title={title}&pic={imgUrl}&url={link}',
            qq: 'http://connect.qq.com/widget/shareqq/index.html?title={title}&summary={desc}&pics={imgUrl}&url={link}',
            qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title={title}&summary={desc}&pics={imgUrl}&url={link}&&otype=share',
            yixin: 'http://open.yixin.im/share?title={title}&desc={desc}&pic={imgUrl}&url={link}&type=webpage'
          }
          for (var key in urls) {
            urls[key] = urls[key].replace(/{([^}]*)}/g, function ($0, $1) {
              return encodeURIComponent(shareConfig[$1])
            })
          }
          window.NewsappShare.urls = urls
          break
      }
    })
  }

  function show (fallback) {
    init(function () {
      switch (appName) {
        case 'newsapp':
          window.newsappAPI.share.openShareMenu()
          break
        case 'micromessenger':
          fallback && fallback(true)
          break
        case 'qq':
        case 'qzone':
          window.mqq.ui.showShareMenu()
          break
        default:
          fallback && fallback(false)
          break
      }
    })
  }

  function updateAntShareLink () {
    if (!window['NTESAntAnalysis']) {
      window.addEventListener('NTMReady', update)
    } else {
      update()
    }

    function update () {
      shareConfig.link = window['NTESAntAnalysis'].getShareLink(shareConfig.link)
      config()
    }
  }
}())