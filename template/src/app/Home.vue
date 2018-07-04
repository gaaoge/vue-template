<template>
  <div class="app-home">
    <hello-vue @click.native="hello"></hello-vue>
    <app-logo @click.native="share"></app-logo>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import AppLogo from './components/Logo'
  import NewsappShare from 'newsapp-share'

  export default {
    name: 'app-home',
    data () {
      return {}
    },
    components: {
      AppLogo
    },
    methods: {
      hello () {
        this.toast('Hello Vue!')
      },
      share () {
        NewsappShare.show()
      },
      ...mapActions(['toast'])
    }
  }
</script>

<style type="text/postcss">
  .app-home {
    height: 100vh;
    padding: 10px 0;
  }
</style>