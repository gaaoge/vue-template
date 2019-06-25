<template>
  <div class="home-main">
    <h5 @click="sayHello">Hello Vue!</h5>
    <home-logo @click.native="doShare"></home-logo>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import HomeLogo from './components/Logo'
  import { shareWithConfig } from '@/utils/share'

  export default {
    name: 'home-main',
    components: {
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

<style lang="postcss" scoped>
  .home-main {
    height: 100vh;

    & > h5 {
      padding: 150px 0;
      font-size: 100px;
      font-weight: bold;
      line-height: 200px;
      text-align: center;
    }
  }
</style>
