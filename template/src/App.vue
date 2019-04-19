<template>
  <div class="app">
    <router-view></router-view>
    <app-toast></app-toast>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style scoped>
  @import "~minireset.css";

  body {
    font: 24px/1.5 sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    -webkit-text-size-adjust: 100%;
    -webkit-user-select: none;
  }

  .app {
    position: relative;
    width: 750px;
    margin: 0 auto;
  }
</style>
