import { getAbsPath, getStaticPath } from '@/utils/index'
import { trackEvent } from '@/utils/track'
import NewsappShare from 'newsapp-share'

const defaultConfig = {
  title: '默认分享标题',
  desc: '默认分享描述',
  imgUrl: getStaticPath('share-icon.png'),
  link: getAbsPath(),
  onlyImg: false,
  shareDone: () => {
    // 统计
    trackEvent('sharedone')
  }
}
let customConfig = {}

function updateShareConfig (config = {}) {
  const origin = config.shareDone
  config.shareDone = () => {
    origin && origin.apply(this, arguments)
    defaultConfig.shareDone.apply(this, arguments)
  }

  customConfig = Object.assign({}, defaultConfig, config)
  NewsappShare.config(customConfig)
}

function shareWithConfig (config = {}, tag) {
  const origin = config.shareDone
  config.shareDone = () => {
    origin && origin.apply(this, arguments)
    defaultConfig.shareDone.apply(this, arguments)
    updateShareConfig(customConfig)
  }

  NewsappShare.config(config)
  NewsappShare.show(tag)
  tag && setTimeout(() => {
    updateShareConfig(customConfig)
  }, 300)
}

export {
  updateShareConfig,
  shareWithConfig
}
