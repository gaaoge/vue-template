<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CommonMask from './common/Mask.vue'
  import CommonShare from './common/Share.vue'

  export default {
    name: 'app',
    created () {
      // 注册全局通用组件
      Vue.component('common-mask', CommonMask)
      Vue.component('common-share', CommonShare)

      // 分享配置
      window.NewsappShare.config({
        title: '分享标题',
        desc: '分享描述',
        imgUrl: 'resource/statics/share-icon.png',
        link: ''
      })
    }
  }
</script>

<style type="text/postcss">
  html, body {
    height: 100%;
    overflow: hidden;
    background: #fff;
  }

  body {
    font: 28px/1.2 sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
  }

  .app {
    position: relative;
    width: 750px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
