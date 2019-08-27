<template>
  <div id="app">
    <router-view></router-view>
    <app-toast></app-toast>
  </div>
</template>

<script>
import { invoke } from 'js-bridge'

export default {
  name: 'app',
  mounted() {
    invoke('render', {
      timestamp: {
        render: Date.now()
      }
    })
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
}
</style>
