<template>
  <div class="home-main">
    <hello-vue @click.native="sayHello"></hello-vue>
    <home-logo @click.native="doShare"></home-logo>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { HelloVue } from 'hello-vue'
  import HomeLogo from './components/Logo'
  import { shareWithConfig } from '@/utils/share'

  export default {
    name: 'home-main',
    components: {
      HelloVue,
      HomeLogo
    },
    methods: {
      sayHello () {
        this.toast('Hello Vue!')
      },
      doShare () {
        shareWithConfig()
      },
      ...mapActions(['toast'])
    }
  }
</script>

<style>
  .home-main {
    height: 100vh;
    padding: 10px 0;
  }
</style>