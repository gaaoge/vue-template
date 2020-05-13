/**
 * 蚂蚁统计
 * Created by GG on 2018/1/9.
 */

import { isOnline } from '@/utils/detect'

function track(event, info) {
  if (!isOnline) return

  if (!window['NTESAntAnalysis']) {
    window.addEventListener('NTMReady', () => {
      track(event, info)
    })
  } else {
    window['NTESAntAnalysis'].sendData({
      projectid: process.env.VUE_APP_PROJECT_ID,
      val_nm: 'c-ntm',
      val_act: event,
      info,
    })
  }
}

export default track
