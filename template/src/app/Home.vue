<template>
  <div class="app-home">
    <hello-vue @click.native="hello"></hello-vue>
    <div class="logo" @click="share"></div>
  </div>
</template>

<script>
  import NewsappShare from 'newsapp-share'
  import { getStaticPath } from 'utils'

  export default {
    name: 'app-home',
    data () {
      return {}
    },
    mounted () {
      // 分享配置
      NewsappShare.config({
        title: '分享标题',
        desc: '分享描述',
        imgUrl: getStaticPath('share-icon.png'),
        link: ''
      })
    },
    methods: {
      hello () {
        this.$app.toast('Hello Vue!')
      },
      share () {
        NewsappShare.show()
      }
    }
  }
</script>

<style type="text/postcss">
  .app-home {
    height: 100%;

    & .logo {
      display: block;
      width: 400px;
      height: 400px;
      margin: 0 auto;
      background: url("/resource/assets/logo.png");
    }
  }
</style>