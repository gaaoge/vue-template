<template>
  <div class="demo-panel">
    <div class="title" @click="sayHello">Hello Vue!</div>
    <logo-widget @click.native="showDialog"></logo-widget>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LogoWidget from '../widgets/LogoWidget'

export default {
  name: 'main-panel',
  components: {
    LogoWidget,
  },
  methods: {
    sayHello() {
      this.toast('Hello Vue!')
    },
    showDialog() {
      this.openDialog('demo-dialog')
    },
    ...mapActions('app', ['toast', 'openDialog']),
  },
}
</script>

<style lang="postcss" scoped>
.demo-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  margin-bottom: 200px;
  font-size: 100px;
  font-weight: bold;
}
</style>
