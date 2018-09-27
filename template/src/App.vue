<template>
  <div class="app">
    <router-view></router-view>
    <common-toast></common-toast>
    <common-modal></common-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import CommonToast from '@/components/common/Toast'
  import CommonModal from '@/components/common/Modal'

  export default {
    name: 'app',
    created () {
      // 默认分享配置
      this.updateShareConfig()
    },
    components: {
      CommonToast,
      CommonModal
    },
    methods: {
      ...mapActions(['updateShareConfig'])
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
