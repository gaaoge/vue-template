<template>
  <div id="app">
    <app-router></app-router>
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

body {
  font: 24px/1.5 sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
  -webkit-text-size-adjust: 100%;
  -webkit-user-select: none;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
