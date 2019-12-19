import NewsappShare from '@newsapp-activity/newsapp-share'
import { getAbsPath, getStaticPath } from '@/utils/index'
import { trackEvent } from '@/utils/track'
import * as jsBridge from '@mf2e/js-bridge'

window.jsBridge = jsBridge
const defaultConfig = {
  title: '默认分享标题',
  desc: '默认分享描述',
  imgUrl: getStaticPath('share-icon.png'),
  link: getAbsPath() + '?spss=share',
  onlyImg: false,
  shareBefore: () => {
    setTimeout(() => {
      updateShareConfig(customConfig)
    }, 300)
  },
  shareDone: res => {
    // 统计
    if (res && res.scene === 'favorite') {
      trackEvent('favorite')
    } else {
      trackEvent('sharedone')
    }
  }
}
let customConfig = {}

function updateShareConfig(config = {}) {
  const origin = config.shareDone
  config.shareDone = () => {
    origin && origin.apply(this, arguments)
    defaultConfig.shareDone.apply(this, arguments)
  }

  customConfig = Object.assign({}, defaultConfig, config)
  NewsappShare.config(customConfig)
}

function shareWithConfig(config = {}, tag) {
  const origin = config.shareDone
  config.shareDone = () => {
    origin && origin.apply(this, arguments)
    defaultConfig.shareDone.apply(this, arguments)
    updateShareConfig(customConfig)
  }

  NewsappShare.config(config)
  NewsappShare.show(tag)
  tag &&
    setTimeout(() => {
      updateShareConfig(customConfig)
    }, 300)
}

export { updateShareConfig, shareWithConfig }
