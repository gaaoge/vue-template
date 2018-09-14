<template>
  <div class="app">
    <router-view></router-view>
    <common-toast></common-toast>
    <common-modal></common-modal>
  </div>
</template>

<script>
  import NewsappShare from 'newsapp-share'
  import { getStaticPath } from 'utils'
  import CommonToast from 'components/common/Toast'
  import CommonModal from 'components/common/Modal'

  export default {
    name: 'app',
    created () {
      // 分享配置
      NewsappShare.config({
        title: '分享标题',
        desc: '分享描述',
        imgUrl: getStaticPath('share-icon.png'),
        link: ''
      })
    },
    components: {
      CommonToast,
      CommonModal
    }
  }
</script>

<style>
  body {
    font: 24px/1.5 sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
  }

  div {
    box-sizing: border-box;
  }

  .app {
    position: relative;
    width: 750px;
    margin: 0 auto;
  }
</style>
