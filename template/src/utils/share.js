import { getAbsPath, getStaticPath } from '@/utils/index'
import { trackEvent } from '@/utils/track'
import NewsappShare from 'newsapp-share'

const shareConfig = {
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

function updateShareConfig (config = {}) {
  const origin = config.shareDone
  config.shareDone = () => {
    origin && origin.apply(this, arguments)
    shareConfig.shareDone.apply(this, arguments)
  }

  NewsappShare.config(Object.assign({}, shareConfig, config))
}

function shareWithConfig (config = {}, tag) {
  const origin = config.shareDone
  config.shareDone = () => {
    origin && origin.apply(this, arguments)
    updateShareConfig()
  }

  updateShareConfig(config)
  NewsappShare.show(tag)
  tag && setTimeout(updateShareConfig, 300)
}

export {
  updateShareConfig,
  shareWithConfig
}
