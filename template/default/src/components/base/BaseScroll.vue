<template>
  <div class="base-scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'base-scroll',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      bscroll: null,
      defaultOptions: {
        swipeBounceTime: 200,
        click: true,
        mouseWheel: true,
        observeDOM: true,
        scrollbar: true,
      },
    }
  },
  mounted() {
    let options = Object.assign({}, this.defaultOptions, this.options)
    this.bscroll = new BScroll(this.$el, options)
  },
}
</script>

<style lang="postcss" scoped>
.base-scroll {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content {
  position: relative;
  height: auto;
}
</style>

<style lang="postcss">
.bscroll-vertical-scrollbar {
  width: 10px !important;
}
</style>
