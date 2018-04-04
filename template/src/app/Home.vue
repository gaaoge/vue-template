<template>
  <div class="app-home">
    <hello-vue @click.native="hello"></hello-vue>
    <app-logo @click.native="share"></app-logo>
  </div>
</template>

<script>
  import NewsappShare from 'newsapp-share'
  import { getStaticPath } from 'utils'
  import AppLogo from './components/Logo'

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
    components: {
      AppLogo
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
    overflow: hidden;
  }
</style>