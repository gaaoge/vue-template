<template>
  <div class="app-home" >
    <hello-vue @click.native="share"></hello-vue>
    <common-share ref="share"></common-share>
  </div>
</template>

<script>
  export default {
    name: 'app-home',
    data () {
      return {}
    },
    methods: {
      share () {
        this.$refs.share.show()
      }
    }
  }
</script>

<style type="text/postcss">
  .app-home {
    height: 100%;
  }
</style>