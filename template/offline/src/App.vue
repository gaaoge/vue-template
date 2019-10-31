<template>
  <div id="app">
    <router-view></router-view>
    <app-toast></app-toast>
  </div>
</template>

<script>
import { renderStart, renderEnd } from '@/utils/offline'

export default {
  name: 'app',
  beforeCreate() {
    renderStart()
  },
  mounted() {
    renderEnd()
  }
}
</script>

<style lang="postcss">
@import '~minireset.css';

body {
  font: 24px/1.5 sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
  -webkit-text-size-adjust: 100%;
  -webkit-user-select: none;
}

#app {
  position: relative;
  width: 750px;
  margin: 0 auto;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
