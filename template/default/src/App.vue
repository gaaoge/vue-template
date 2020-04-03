<template>
  <div id="app">
    <router-view></router-view>
    <app-toast></app-toast>
  </div>
</template>

<script>
export default {
  name: 'app'
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
</style>
