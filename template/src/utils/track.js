const projectId = 'NTM-BXR8M5Z5-1'

function trackEvent (event, info) {
  if (!window['NTESAntAnalysis']) {
    window.addEventListener('NTMReady', () => {
      trackEvent(event, info)
    })
  } else {
    window['NTESAntAnalysis'].sendData({
      projectid: projectId,
      val_nm: 'c-ntm',
      val_act: event,
      info
    })
  }
}

export {
  projectId,
  trackEvent
}