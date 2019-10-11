<template>
  <div class="home-page">
    <h5 @click="sayHello">Hello Vue!</h5>
    <home-logo @click.native="doShare"></home-logo>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HomeLogo from './components/Logo'
import { shareWithConfig } from '@/utils/share'

export default {
  name: 'home-page',
  components: {
    HomeLogo
  },
  methods: {
    sayHello() {
      this.toast('Hello Vue!')
    },
    doShare() {
      shareWithConfig()
    },
    ...mapActions('app', ['toast'])
  }
}
</script>

<style lang="postcss" scoped>
.home-page {
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
