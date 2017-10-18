;(function (window) {
  var Navigator = (function () {
    var frame
    var androidReg = /Android/gi
    var isAndroid = androidReg.test(navigator.platform) || androidReg.test(navigator.userAgent)
    /**
     * iframe 元素
     *
     * @property {Element} frame
     */
    frame = null

    /**
     * 创建iframe,帮助解决iOS的UIWebView没有JS API
     *
     * @method getFrame
     * @return {Element} iframe
     */
    function getFrame (src) {
      var _frame = document.createElement('iframe')
      _frame.setAttribute('style', 'display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;')
      _frame.setAttribute('height', '0px')
      _frame.setAttribute('width', '0px')
      _frame.setAttribute('frameborder', '0')
      if (src) {
        _frame.setAttribute('src', src)
      } else {
        document.documentElement.appendChild(_frame)
      }
      return _frame
    }

    /**
     * 删除iframe
     *
     * @method removeFrame
     * @param {Element} frame 执行的方法
     */
    function removeFrame (frame) {
      frame && frame.parentNode.removeChild(frame)
    }

    /**
     * 执行与客户端交互的协议
     *
     * @method protocol
     * @param {String} command 执行的协议及命令
     * @param {boolean} single 是否是使用独立的iframe,默认false
     * @param {boolean} noframe 是否不通过iframe,默认false
     */
    function protocol (command, single, noframe) {
      var _frame, timer
      // 不通过iframe
      if (noframe) {
        window.location.href = command
        return
      }
      // 通过iframe
      if (single) {
        if (isAndroid) {
          _frame = getFrame()
          _frame.setAttribute('src', command)
        } else {
          _frame = getFrame(command)
          document.documentElement.appendChild(_frame)
        }
        timer = setTimeout(function () {
          _frame && removeFrame(_frame)
        }, 30000)
        _frame.onload = _frame.onreadystatechange = function () {
          timer && clearTimeout(timer)
          _frame && removeFrame(_frame)
        }
      } else {
        frame = frame || getFrame()
        frame.setAttribute('src', command)
      }
    }

    return {
      protocol: protocol
    }
  })()

  window.NewsappClient = (function (protocolHandler) {
    var debug = false
    var isNewsapp = (/newsapp/ig).test(navigator.userAgent)
    var isAndroid = !!navigator.userAgent.match(/(Android|Adr)/ig)
    var isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    var Callbacks
    var Protocols

    Callbacks = {
      afterEncrypt: [],
      afterShare: [],
      afterUserinfo: [],
      afterLogin: [],
      afterDevice: [],
      afterUploadImage: [],
      afterComment: [],
      afterOtherappinfo: [],
      afterActionbutton: [],
      afterAddAlert: [],
      afterRemoveAlert: [],
      afterCheckAlert: [],
      afterChangeAlert: [],
      afterEnableAlert: [],
      afterTrashId: [],
      afterLocation: []
    }
    Protocols = {
      share: 'share://{TYPE}',
      updateprofile: 'updateprofile://',
      encrypt: 'encrypt://',
      pushview: 'pushview://{TYPE}',
      userinfo: 'userinfo://',
      login: 'login://',
      device: 'device://',
      uploadImageByCamera: 'uploadimage://camera/{W}_{H}',
      uploadImageByAlbum: 'uploadimage://album/{W}_{H}',
      openComment: 'newsapp://comment/{BOARD_ID}/{DOC_ID}/{TITLE}',
      comment: 'comment://',
      otherappinfo: isAndroid ? 'otherappinfo://' : 'otherappinfo://intent/',
      copy: 'copy://',
      toolbar: 'docmode://toolbar/{COMMAND}',
      modifytitle: 'docmode://modifytitle/{TITLE}',
      actionbutton: 'docmode://actionbutton/{NAME}',
      addAlert: 'alert://add',
      removeAlert: 'alert://remove',
      checkAlert: 'alert://check',
      changeAlert: 'alert://change',
      enableAlert: 'alert://enable',
      trashid: 'trashid://',
      location: 'location://current'
    }

    function enableDebug () {
      debug = true
    }

    function protocol (action, callback) {
      protocolHandler(action, true)
      // 开启调试
      if (debug && callback) {
        var _data = action.match(/[\w]:\/\/(.*)/)
        callback(_data && _data[1])
      }
    }

    function afterCallback (rs, type) {
      if (Callbacks[type] && Callbacks[type].length > 0) {
        var callback = Callbacks[type].shift()
        callback && callback.call(this, rs)
      }
    }

    window.__newsapp_share_done = function (rs) {
      afterCallback(rs, 'afterShare')
    }
    window.__newsapp_encrypt_done = function (rs) {
      afterCallback(rs, 'afterEncrypt')
    }
    window.__newsapp_userinfo_done = function (rs) {
      afterCallback(rs, 'afterUserinfo')
    }
    window.__newsapp_login_done = function (rs) {
      afterCallback(rs, 'afterLogin')
    }
    window.__newsapp_device_done = function (rs) {
      afterCallback(rs, 'afterDevice')
    }
    window.__newsapp_upload_image_done = function (rs) {
      afterCallback(rs, 'afterUploadImage')
    }
    window.__newsapp_comment_done = function (rs) {
      afterCallback(rs, 'afterComment')
    }
    window.__newsapp_otherappinfo_done = function (rs) {
      afterCallback(rs, 'afterOtherappinfo')
    }
    window.__newsapp_browser_actionbutton = function (rs) {
      afterCallback(rs, 'afterActionbutton')
    }
    window.__newsapp_alert_add_done = function (rs) {
      afterCallback(rs, 'afterAddAlert')
    }
    window.__newsapp_alert_remove_done = function (rs) {
      afterCallback(rs, 'afterRemoveAlert')
    }
    window.__newsapp_alert_check_done = function (rs) {
      afterCallback(rs, 'afterCheckAlert')
    }
    window.__newsapp_alert_change_done = function (rs) {
      afterCallback(rs, 'afterChangeAlert')
    }
    window.__newsapp_alert_enable_done = function (rs) {
      afterCallback(rs, 'afterEnableAlert')
    }
    window.__newsapp_trashid_done = function (rs) {
      afterCallback(rs, 'afterTrashId')
    }
    window.__newsapp_location_done = function (rs) {
      afterCallback(rs, 'afterLocation')
    }

    // 更新用户资料
    function updateProfile () {
      protocol(Protocols.updateprofile)
    }

    /**
     * 登录
     * @param {Function} callback 成功回调
     */
    function login (callback) {
      Callbacks.afterLogin.push(callback)
      protocol(Protocols.login, callback)
    }

    /**
     * 获取用户信息
     * @param {Function} callback 成功回调
     */
    function userInfo (callback) {
      Callbacks.afterUserinfo.push(callback)
      protocol(Protocols.userinfo, callback)
    }

    /**
     * 获取设备信息
     * @param {Function} callback 成功回调
     */
    function device (callback) {
      Callbacks.afterDevice.push(callback)
      protocol(Protocols.device, callback)
    }

    /**
     * 分享
     * @param {Function} callback 成功回调
     */
    function share (callback, type) {
      Callbacks.afterShare = [callback]
      protocol(Protocols.share.replace('{TYPE}', type || ''), callback)
    }

    /**
     * 打开客户端视图
     * @param {String} type feedback,font,personalcenter,skin,font
     */
    function pushView (type) {
      protocol(Protocols.pushview.replace('{TYPE}', type))
    }

    /**
     * 加密
     * @param {String} data 待加密数据
     * @param {Function} callback 成功回调
     */
    function encrypt (data, callback) {
      Callbacks.afterEncrypt.push(callback)
      if (window.extra && window.extra.__newsapp_encrypt) {
        afterCallback(window.extra.__newsapp_encrypt(data), 'afterEncrypt')
      } else {
        protocol(Protocols.encrypt + encodeURIComponent(data), callback)
      }
    }

    /**
     * 上传图片 调用摄像头
     * @param {Integer} width 图片宽
     * @param {Integer} height 图片高
     * @param {Function} callback 成功回调
     */
    function uploadImageByCamera (width, height, callback) {
      Callbacks.afterUploadImage.push(callback)
      protocol(Protocols.uploadImageByCamera.replace('{W}', width).replace('{H}', height), callback)
    }

    /**
     * 上传图片 调用图库
     * @param {Integer} width 图片宽
     * @param {Integer} height 图片高
     * @param {Function} callback 成功回调
     */
    function uploadImageByAlbum (width, height, callback) {
      Callbacks.afterUploadImage.push(callback)
      protocol(Protocols.uploadImageByAlbum.replace('{W}', width).replace('{H}', height), callback)
    }

    /**
     * 打开文章跟贴
     * @param {String} boardid 版块ID
     * @param {String} docid 文章ID
     * @param {String} title 文章标题
     */
    function openComment (boardid, docid, title) {
      protocol(Protocols.openComment.replace('{BOARD_ID}', boardid).replace('{DOC_ID}', docid).replace('{TITLE}', title || ''))
    }

    /**
     * 直接发表跟贴
     * @param {Function} callback 成功回调
     */
    function comment (callback) {
      Callbacks.afterComment.push(callback)
      protocol(Protocols.comment, callback)
    }

    /**
     * 其他应用信息
     * @param {String} id
     * @param {Function} callback 成功回调
     */
    function otherappinfo (id, callback) {
      Callbacks.afterOtherappinfo.push(callback)
      protocol(Protocols.otherappinfo + id, callback)
    }

    /**
     * 复制文本到剪贴板
     * @param {String} text
     */
    function copy (text) {
      protocol(Protocols.copy + text)
    }

    /**
     * 显示隐藏正文工具栏
     * @param {String} command  show|hide
     */
    function toolbar (command) {
      protocol(Protocols.toolbar.replace('{COMMAND}', command))
    }

    /**
     * 更新标题
     * @param {String} title
     */
    function modifyTitle (title) {
      document.title = title || document.title
      protocol(Protocols.modifytitle.replace('{TITLE}', encodeURIComponent(title)))
    }

    /**
     * 更新右上角功能菜单按钮
     * @param {String} name
     */
    function actionbutton (name, callback) {
      Callbacks.afterActionbutton.push(callback)
      protocol(Protocols.actionbutton.replace('{NAME}', encodeURIComponent(name)), callback)
    }

    /**
     * 添加本地提醒
     * @param {String} name
     */
    function addAlert (callback) {
      Callbacks.afterAddAlert.push(callback)
      protocol(Protocols.addAlert, callback)
    }

    /**
     * 删除本地提醒
     * @param {String} name
     */
    function removeAlert (callback) {
      Callbacks.afterRemoveAlert.push(callback)
      protocol(Protocols.removeAlert, callback)
    }

    /**
     * 检查本地提醒
     * @param {String} name
     */
    function checkAlert (callback) {
      Callbacks.afterCheckAlert.push(callback)
      protocol(Protocols.checkAlert, callback)
    }

    /**
     * 修改本地提醒
     * @param {String} name
     */
    function changeAlert (callback) {
      Callbacks.afterChangeAlert.push(callback)
      protocol(Protocols.changeAlert, callback)
    }

    /**
     * 检查通知功能是否开启
     * @param {String} name
     */
    function enableAlert (callback) {
      Callbacks.afterEnableAlert.push(callback)
      protocol(Protocols.enableAlert, callback)
    }

    /**
     * 获取防刷id
     * @param {Function} callback 成功回调
     */
    function trashId (callback) {
      Callbacks.afterTrashId.push(callback)
      protocol(Protocols.trashid, callback)
    }

    /**
     * 获取本地位置
     * @param {Function} callback 成功回调
     */
    function location (callback) {
      Callbacks.afterLocation.push(callback)
      protocol(Protocols.location, callback)
    }

    /**
     * 打开网易新闻
     * @param
     * 首页： /startup
     * 文章： /doc/951C0KA70001124J
     * 专题： /topic/S1385797470941
     * 网页： /web/http%3A%2F%2Fwww.163.com
     * 图集： /photo/0096/32491
     * 跟贴： /tie/C44U3PJ700097U7S
     * 直播： /live/55474
     * 视频： /video/VBV126LCH
     * 问吧： /expert/EX4064892651204023641
     * 话吧： /subject/SJ3699667062136051057
     * 萝卜： /luobo/123123
     * 新闻栏目： /channel/T1348649580692
     * 订阅（网易号）: /reader/T1374482883888
     */
    function open (path, channel) {
      path = path || '/startup'
      channel = channel || 'sps'

      if (isNewsapp) {
        protocol('newsapp:/' + path)
      } else {
        window.location.href = 'http://m.163.com/newsapp/applinks.html?path=' + encodeURIComponent(path) + '&s=' + channel
      }
    }

    return {
      isNewsapp: isNewsapp,
      isAndroid: isAndroid,
      isIos: isIos,
      login: login,
      userInfo: userInfo,
      device: device,
      share: share,
      encrypt: encrypt,
      updateProfile: updateProfile,
      uploadImageByCamera: uploadImageByCamera,
      uploadImageByAlbum: uploadImageByAlbum,
      pushView: pushView,
      openComment: openComment,
      comment: comment,
      otherappinfo: otherappinfo,
      copy: copy,
      toolbar: toolbar,
      modifyTitle: modifyTitle,
      actionbutton: actionbutton,
      enableDebug: enableDebug,
      addAlert: addAlert,
      removeAlert: removeAlert,
      checkAlert: checkAlert,
      changeAlert: changeAlert,
      enableAlert: enableAlert,
      trashId: trashId,
      location: location,
      open: open,
      protocol: protocol,
      Callbacks: Callbacks
    }
  })(Navigator.protocol)
}(window))
