<template>
  <div class="app">
    <router-view></router-view>
    <common-modal></common-modal>
    <common-toast></common-toast>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    font: 24px/1.5 sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
  }

  div {
    box-sizing: border-box;
  }

  .app {
    position: relative;
    width: 750px;
    margin: 0 auto;
  }
</style>
