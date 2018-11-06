import { getAbsPath, getStaticPath } from '@/utils/index'
import { trackEvent } from '@/utils/track'
import NewsappShare from 'newsapp-share'

const shareConfig = {
  title: '知识无极限，答题天天见！',
  desc: '智力大比拼，最高可赢iPhone XS',
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
}

export {
  updateShareConfig,
  shareWithConfig
}
