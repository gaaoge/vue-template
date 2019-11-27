<template>
  <div class="home-page">
    <h5 class="title" @click="sayHello">Hello Vue!</h5>
    <vue-logo @click.native="doShare"></vue-logo>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueLogo from './components/VueLogo'
import { shareWithConfig } from '@/utils/share'

export default {
  name: 'home-page',
  components: {
    VueLogo
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
}

.title {
  padding: 150px 0;
  font-size: 100px;
  font-weight: bold;
  line-height: 200px;
  text-align: center;
}
</style>
