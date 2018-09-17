<template>
  <div class="app-home">
    <hello-vue @click.native="sayHello"></hello-vue>
    <app-logo @click.native="doShare"></app-logo>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import AppLogo from 'components/Logo'

  export default {
    name: 'app-home',
    data () {
      return {}
    },
    components: {
      AppLogo
    },
    methods: {
      sayHello () {
        this.toast('Hello Vue!')
      },
      doShare () {
        this.share()
      },
      ...mapActions(['toast', 'share'])
    }
  }
</script>

<style>
  .app-home {
    height: 100vh;
    padding: 10px 0;
  }
</style>