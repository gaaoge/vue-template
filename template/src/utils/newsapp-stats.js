;(function () {
  window.NewsappStats = {
    trackView: function (view) {
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
    },
    trackEvent: function (event, action) {
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
  }
}())
