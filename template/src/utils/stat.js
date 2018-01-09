/**
 * 统计工具类
 * Created by GG on 2018/1/9.
 */

function trackView (view) {
  if (window['neteaseAnalysis']) {
    window['neteaseAnalysis']({
      type: 'special',
      modelid: window['_ntes_sps_modelid'],
      view: view,
      spst: 5
    })
  }
  if (window['NTESAntAnalysis']) {
    window['NTESAntAnalysis'].sendData({
      projectid: window['_ntes_ant_projectid'],
      val_nm: 'pageview',
      val_act: view
    })
  }
  if (window['_hmt']) {
    window['_hmt'].push(['_trackPageview', window.location.pathname.replace('index.html', view + '.html')])
  }
}

function trackEvent (event, action) {
  action = action || 'click'

  if (window['neteaseAnalysis']) {
    window['neteaseAnalysis']({
      type: 'func',
      modelid: window['_ntes_sps_modelid'],
      action: action,
      event: event,
      spst: 5
    })
  }
  if (window['NTESAntAnalysis']) {
    window['NTESAntAnalysis'].sendData({
      projectid: window['_ntes_ant_projectid'],
      val_nm: action,
      val_act: event
    })
  }
  if (window['_hmt']) {
    window['_hmt'].push(['_trackEvent', action, event])
  }
}

export {
  trackView,
  trackEvent
}
