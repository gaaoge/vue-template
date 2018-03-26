<template>
  <div class="app">
    <router-view></router-view>
    <common-toast ref="toast"></common-toast>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CommonModal from './common/Modal'
  import CommonToast from './common/Toast'

  export default {
    name: 'app',
    created () {
      // 注册全局通用组件
      Vue.component('common-modal', CommonModal)
      Vue.component('common-toast', CommonToast)

      //注入$app实例
      Vue.mixin({
        beforeCreate () {
          this.$app = this.$root.$children[0]
        }
      })
    },
    methods: {
      toast (content) {
        this.$refs.toast.show(content)
      }
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
