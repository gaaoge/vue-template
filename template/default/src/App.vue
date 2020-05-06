<template>
  <div class="app">
    <router-view></router-view>
    <app-toast></app-toast>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="postcss">
@import '~minireset.css';

html {
  height: 100%;
}

body {
  height: 100%;
  font: 24px/1.5 sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
  -webkit-text-size-adjust: 100%;
  -webkit-user-select: none;
}

.app {
  height: 100%;
}
</style>
