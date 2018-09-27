<template>
  <div class="home">
    <hello-vue @click.native="sayHello"></hello-vue>
    <home-logo @click.native="doShare"></home-logo>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { HelloVue } from 'hello-vue'
  import HomeLogo from './components/Logo'

  export default {
    name: 'home',
    components: {
      HelloVue,
      HomeLogo
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
  .home {
    height: 100vh;
    padding: 10px 0;
  }
</style>